---
slug: "Serialization"
title: "직렬화, Serialization"
description: "Java에서 객체를 스트림으로 쓰고 읽을 수 있는 직렬화(Serialization)에 대해 알아보자"
date: 2024-07-22T13:19:20
thumbnail: "Java"
category: "Java"
keyword: "Serialization, serialization, 직렬화, 자바, Java"
---

직렬화는 객체를 컴퓨터에 저장했다가 다음에 다시 꺼내 쓸 수 없을지 혹은 네크워크를 통해 객체를 주고받을 수 없는지를 가능하게 해줍니다.

# 어쩌다가?..

Spring 강의 질문 답변 중 String 타입에 json 형태로 값을 저장해, jackson의 ObjectMapper를 사용해 객체로 읽는 과정에서 leading zeros 오류가 발생하여 해당 내용을 찾아봤습니다. 문제 발생 원인은 숫자 값을 저장하는데 있어서 01을 사용했던 것이고, JSON 명세서에도 쓰여있듯이 Octal과 Hex는 Number 타입에서 지원하지 않고, 0으로 시작하는 것을 허용하지 않기 때문에 1로 저장하거나 문자열로 저장, 혹은 application.properties에서 leading zeros를 허용하는 설정을 해주면 됐습니다.
<br></br>
질문은 해결했지만 ObjectMapper를 사용해서 String을 객체로 변환하는 역직렬화 과정이
궁금해져서 직렬화에 대해 공부하게 되었습니다.
참고 문서는 **자바의 정석**과 **Oracle**의 공식문서입니다.

#### 링크

- [ObjectInputStream(Oracle 공식문서)](https://docs.oracle.com/javase%2F8%2Fdocs%2Fapi%2F%2F/java/io/ObjectInputStream.html)
- [ObjectOutputStream(Oracle 공식문서)](https://docs.oracle.com/javase/8/docs/api/java/io/ObjectOutputStream.html)

# 직렬화와 역직렬화

`직렬화`란 객체를 데이터 스트림으로 쓰는 것을 뜻한다.  
`역직렬화`란 스트림으로부터 데이터를 읽어서 객체를 읽는 것을 뜻한다.

#### 객체

- 클래스에 정의된 인스턴스변수의 집합이다.
- 클래스 변수나 메서드가 포함되지 않는다.
- 객체는 오직 인스턴스변수들로만 구성되어 있다.

> 인스턴스 변수는 인스턴스마다 다른 값을 가질 수 있어야하기 때문에 별도의 메모리 공간이 필요하지만 메서드는 변하는 것이 아니기 때문에 메모리를 낭비해가면서 인스턴스마다 같은 메서드를 코드에 포함시킬 이유는 없다.

`객체를 저장한다는 것은 바로 객체의 모든 인스턴스 변수의 값을 저장한다는 것과 같은 의미이다.`

두 객체가 동일한지 판단하는 기준은 두 객체의 인스턴스 변수의 값들이 같고 다름이다.

---

## ObjectOutputStream

> An ObjectOutputStream writes primitive data types and graphs of Java objects to an OutputStream

ObjectOutputStream은 [**primitive data types**](#primitive-data-types "기본 자료형")와 [**graphs of Java objects**](#graphs-of-java-objects "참조가 포함된 객체가 직렬화되면 자동으로 직렬화되는 객체 세트")를 OutputStream에 쓴다고 합니다.
Oracle 공식문서에 나와있는 ObjectOutputStream의 역할입니다. 즉, 직렬화(스트림에 객체를 출력)에 사용한다.

#### Class 선언부

```java
public class ObjectOuputStream extends OutputStream implements ObjectOutput, ObjectStreamConstants {
 ... }
```

OutputStream을 직접 상속받고 ObjectOutput, ObjectStreamConstants 인터페이스를 구현한다.

#### 개요

- **java.io.Serializable** 인터페이스를 **implements**하는 객체만 스트림에 쓰여질 수 있다.
- writeObject 메서드를 사용해서 스트림에 객체를 쓴다.
- String, 배열을 포함하는 어떤 객체든 writeOjbect()로 쓰여진다.
- Multiple objects 또는 primitives도 스트림에 쓰여질 수 있다.
- 그 객체들(writeObject 메서드로 쓰여진)은 반드시 객체가 쓰여진 것과 동일하게 같은 타입, 같은 순서로 상응하는 ObjectInputstream으로 다시 읽어져야만 한다.
- Primitives data types도 DataOutput의 적절한 메서드를 사용하여 스트림에 쓰여질 수 있다.
- String도 writeUTF 메서드로 쓰여질 수 있다.

<!-- #### The default serialization mechanism

> The default serialization mechanism for an object writes the class of the object, the class signature, and the values of all non-transient and non-static fields.

위 문장은 Oracle 공식문서에서 인용한 것이다.
The default serialization mechanism을 통해 객체의 클래스, 클래스 서명 그리고 **transient**와 **static** 필드가 아닌 값들을 직렬화한다고 한다.
여기서 나온 키워드에 대해서는 밑에서 살펴보자. -->

---

## ObjectInputStream

역직렬화(스트림으로부터 객체를 입력)에 사용한다.

#### Class 선언부

```java
public class ObjectInputStream extends InputStream implements ObjectInput, ObjectStreamConstants {
 ... }
```

InputStream을 직접 상속받고 ObjectInput과 ObjectStreamConstants 인터페이스를 구현한다.

#### 개요

ObjectInputStream은 이전에 ObjectOutputStream으로 쓰여진 primitive data와 객체들을 역직렬화한다.
***

#### ObjectInputStream/ObjectOutputStream 사용할 때

> ObjectOutputStream과 ObjectInputStream 둘 다 기반스트림을 필요로하는 보조 스트림이다.

따라서 아래와 같이 객체를 생성할 때 입출력할 스트림을 지정해주어야 한다.

```java
ObjectInputStream(InputStream in)
ObjectOutputStream(OutputStream out)
```

이제 ObjectInputStream과 ObjectOutputStream이 어떤 역할을 가지고 있는지 알아보았습니다.  
아래에서는 FileInputStream, FileOutputStream을 사용해서 파일에 Java 객체를 쓰고 또 읽는법을 알아보겠습니다.

***

#### 파일에 객체를 저장

```java
try {
    FileOutputStream fos = new FileOutputStream("objectfile.ser");
    ObjectOutputStream out = new ObjectOutputStream(fos); // 기반 스트림으로 fos 사용

    UserInfo u1 = new UserInfo("홍길동");
    UserInfo u2 = new UserInfo("고길동");
    ArrayList<UserInfo> list = new ArrayList<>();
    list.add(u1);
    list.add(u2);

    out.writeObject(u1); // u1 객체를 스트림으로 변환
    out.writeObject(u2); // u2 객체를 스트림으로 변환
    out.writeObject(list); // list 객체를 스트림으로 변환

    out.close(); // 스트림 닫아주기
} catch(IOException e) {
    e.printStackTrace();
}
```
***
#### 파일을 통해 객체를 읽기

파일을 객체에 쓰는 과정과 반대로 진행하면 된다. 유의할 점은 아래와 같다.

- readObject()의 반환 타입은 Object이다. 최상위 클래스인 Object는 java.io.Serializable을 구현하지 않기 떄문에 읽으려는 객체의 타입으로 형변환을 시켜줘야 한다.
- writeObject()로 객체를 썼던 순서대로 읽어야한다.

```java
try {
    FileInputStream fis = new FileInputStream("objectfile.ser");
    ObjectInputStream in = new ObjectInputStream(fis); // 기반 스트림으로 fis 사용

    //직렬화했던 순서대로 역직렬화해야한다.
    UserInfo u1 = (UserInfo) in.readObject(); // readObject()의 반환타입은 Object이다.
    UserInfo u2 = (UserInfo) in.readObject();
    ArrayList list = (ArrayList) in.readObject();

    in.close(); // 스트림 닫아주기
} catch(Exception e) {
    e.printStackTrace();
}
```
