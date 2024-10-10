---
slug: "POST-메서드의-Content-Type"
title: "[WEB]POST 메서드의 Content-Type"
description: "POST 메서드의 Content-Type와 Percent-encoding에 대하여"
date: 2024-08-08 16:19:00+09:00
thumbnail: "CS"
category: "CS"
series: "WEB"
keyword: "POST, POST Method, HTTP, Content-Type, application/x-www-form-urlencoded, Percent-encoding, URL encoding, multipart/form-data"
---

요새 Spring 강의를 복습 수강하느라 포스팅 할 시간이 없네요ㅎㅎ..  
<br>
오늘은 강의를 수강하다가 클라이언트와 서버가 데이터를 주고받는 과정에서 클라이언트에서 \<form\> 요소를 통해 POST 요청을 서버에 보낼 때, 요청 헤더의 `Content-Type`이 `application/x-www-form-urlencoded` 였고, 서버에서 `@RequestParam`을 통해 body에 담겨있는 데이터를 읽을 수 있었습니다. 그래서 해당 타입에 대해 궁금증이 생겼고, 파고 들어가다보니 POST 메서드의 Content-Type에 대해 학습하게 되어서 이 글에서는 왜 클라이언트에서 POST 메서드로 form 데이터를 보낼 때 Content-Type에 대해 학습한 내용을 정리했습니다.

# POST Method

HTTP 메서드의 POST 메서드는 서버에 데이터를 보낼 때 사용합니다.
요청 본문의 데이터 타입은 요청 헤더의 Content-Type에 명시되어 있습니다.

## Content-Type

POST 요청은 주로 HTML 문서의 \<form\>을 통해서 이루어지며 POST 요청의 `Content-Type`은 \<form\>의 `enctype` 속성이나 \<input\>, \<button\>의 `formenctype` 속성의 값에 의해 선택됩니다.  
\<form\>의 `enctype` 속성은 아래의 3가지 값을 가질 수 있습니다.  
<br>

**application/x-www-form-urlencoded**

enctype 속성의 기본 값입니다 \<form\>에 enctype이 따로 명시되어있지 않을 경우 이 값이 기본 값으로 적용됩니다.

**multipart/form-data**

form이 \<form\>과 함께 file을 포함할 때 사용합니다.

**text/plain**

디버깅 목적으로 사용하기에 유용합니다.

# application/x-www-form-urlencoded

key와 value의 튜플들(연속적)로 이루어집니다. 각각의 key와 value는 `&` 로 구분되며 key와 value 사이에는 `=` 가 있습니다. 이 key와 value에 알파벳이 아닌 문자들이 있을 경우 **Percent-encoding(URL encoding)** 으로 인코딩됩니다. 그렇기 때문에 `application/x-www-form-urlencoded` 타입은 바이너리 데이터에 사용하기에 적합하지 않습니다. 이 경우에는 `multipart/form-data` 를 대신 사용해야합니다.  
(동영상이나 이미지의 경우 비트스트림으로 넘어가기 때문입니다.)  
<br>
아래의 형식을 가집니다.

```text/plain
name=Robbie&age=95
```

<hr>

## Percent-encoding(URl encoding)

Percent-encoding 메커니즘은 URL에서 특정 의미를 가지는 8-bit 문자를 인코딩할 때 사용합니다.  
<br>
국제 인터넷 표준화 기구에서 관리하는 기술 표준인 RFC3986에서는 이렇게 설명합니다. Percent-encoding 메커니즘은 데이터 옥텟(octet)이 허용된 문자 집합을 벗어나거나, 해당 옥텟이 컴포넌트의 구분자로 사용될 때 그 데이터를 표현하기 위해 사용됩니다.

> 옥텟, octet은 8-bit가 한 곳에 모인 것을 말합니다. 초기 컴퓨터들은 1byte가 꼭 8bit만을 의미하지 않았으므로 8-bit를 명확하게 정의하기 위해서 옥텟이라는 용어가 필요했습니다.  
> 출처: [**Wikipedia**](<https://ko.wikipedia.org/wiki/%EC%98%A5%ED%85%9F_(%EC%BB%B4%ED%93%A8%ED%8C%85)>)

Percent-encoding이 사용되는 조건은 아래와 같습니다

> Under normal circumstances, the only time when octets within a URI are percent-encoded is during the process of producing the URI from its component parts.  
> [**RFC 3986의 section 2.4 When to Encode or Decode**](https://datatracker.ietf.org/doc/html/rfc3986#section-2.4)

해석하자면, 일반적인 상황에서, URI 내의 옥텟이 Percent-encoding되는 유일한 경우는 URI를 그 구성 요소로부터 생성하는 과정 동안이라고 합니다. 저는 URI를 생성할 때 문자가(데이터 옥텟이 8-bit를 명확히 나타내므로 문자 1개로 봐도 되겠네요) URI의 허용된 문자 집합을 벗어나거나 구분자로 사용될 때 해당 문자 데이터를 URI에 표현하기 위해 Percent-encoding이 사용된다고 이해했습니다.

<hr>

### Percent-encoding 구성

Percent-encoding된 옥텟(문자 1개)은 `%`와 두 개의 16진수 숫자로 구성된 문자 triplet(3개 묶음)으로 인코딩됩니다.

```text/plain
pct-encoded = "%" HEXDIG HEXDIG
```

대문자 16진수 숫자 `A` ~ `F`는 소문자 숫자 `a` ~ `f`와 각각 동등합니다
즉, Percent-encoding된 옥텟의 16진수 숫자의 대소문자 차이만 있는 두 URI는 서로 동등합니다.
일관성을 위해서 URI 생성자와 정규화 도구는 모든 Percent-encoding에 대문자 16진수를 사용해야한다고 RFC3986에 명시되어있습니다.  
<br>
인코딩이 필요한 특정 문자들은 아래와 같습니다. [**좀더 자세히 알아보기**](https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding)  
`:`, `/`, `?`, `#`, `[`, `]`, `@`, `!`, `$`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `;`, `=`, `%`, `space`  
이 문자들 이외의 다른 문자들은 인코딩 할 수 있어도 할 필요가 없습니다.  
<br>
마지막 `space`(공백문자)는 application/x-www-form-urlencoded의 Percent-encoding에서는 `+`로 치환되고 URL에서는 `%20`으로 치환됩니다. (%20은 이진 옥텟 00100000을 Percent-encoding 한 것으로 US-ASCII에서 공백문자에 해당합니다.)  
<br>
**전체 내용을 이해하지 못하셨더라도 Percent-encoding은 URL에서 특정 의미를 가지는 8-bit 문자를 인코딩 할때 사용된다는 사실만 알아주셔도 좋습니다!**

<hr>

### HTTP 메시지

HTTP 메시지의 구성요소로는 Header와 Body가 있습니다.  
첫 문단의 줄바꿈을 기준으로 Header와 Body가 나뉘어집니다.

```text/plain
POST /test HTTP/1.1 ---> Header
Host: simlog.life
Content-Type: application/x-www-form-urlencoded
Content-Length: 49

name=Robbie&age=95 ---> Body
```

# multipart/form-data

key는 각각의 데이터 블록의 Header 부분의 `Content-Disposition`에 작성됩니다. 각각의 value는 body 부분에서 데이터 블록으로 전달됩니다.
이 때 각각의 데이터 블록은 `boundary`라는 구분자(user agent defined delimeter, 사용자 쪽에 정의된 구분자라고 이해했습니다.)로 분리됩니다.
<hr>

### HTTP 메시지

마지막 boundary가 작성된 부분이 데이터 블록의 끝을 의미하며 HTTP 메시지처럼 각각의 boundary 안에도 줄바꿈으로 Header와 Body가 나뉘는 것을 알 수 있습니다. boundary의 시작은 `--` 으로 시작하며 끝맺음 역시 `--`으로 마지막 부분이라는 것을 알립니다.

```text/plain
POST /test HTTP/1.1
Content-Type: multipart/form-data;boundary="ExampleBoundary"

--ExampleBoundary
Content-Disposition: form-data; name="name"

Robbie
--ExampleBoundary
Content-Disposition: form-data; name="age"

95
--ExampleBoundary--
```

<hr>
이렇게해서 POST 요청시 요청 Body에 담기는 데이터의 Content-Type에 대해 알아보았습니다. 공부를 하고 나서 메모장에 정리한 후에 한번 더 옮겨적는 식으로 포스팅을 하고 있는데 번거롭지만 자연스레 반복숙달하게 되면서 학습하는데에는 많은 도움이 되는 것 같습니다. 읽어주셔서 감사합니다.

# 참고자료
[**POST, MDN**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)  
[**Percent-encoding, MDN**](https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding)  
[**form, MDN**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attributes)  
[**RFC3986**](https://datatracker.ietf.org/doc/html/rfc3986#section-2.1)  
