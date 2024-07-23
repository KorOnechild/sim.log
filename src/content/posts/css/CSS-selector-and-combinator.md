---
slug: "CSS-selector-and-combinator"
title: "CSS selector와 combinator"
description: "CSS selector의 종류와 combinator에 대해 알아보자"
date: 2024-07-06T13:19:20+09:00
thumbnail: "CSS"
category: "CSS"
keyword : "css, css 선택자, css selector"
---

이 블로그를 만들면서 CSS에 대해 공부할 기회가 많았습니다.
공부를 하면서 이렇게 정리하는 습관을 들이는 것이 공부한 내용을 기억에도 확실히 각인시킬 수 있는 것 같습니다.
<br></br>
프론트엔드 공부는 특히 작은 개념들이 많아서 어렵게 느껴지는 것 같습니다.
하지만 꾸준히 나아가다보면 아는게 많아질거고, 아는게 많아질수록 공부가 더 재밌어질거라고 생각합니다.
이 글에서 정리한 내용은 MDN에 나와있는 CSS 선택자에 관한 내용입니다.

# CSS Selector

`CSS 선택자(CSS selector)`는 CSS 작업을 할 때 원하는 요소에 원하는 스타일을 정확하게 주기 위해 반드시 알고 있어야 하는 개념입니다.
기본 선택자에 해당하는 `요소 선택자(type selector)`, `전체 선택자(Universal selector)`, `Class 선택자(Class selector)`,
`Id 선택자(Id selector)`가 있습니다.

## 요소 선택자

요소 선택자는 말 그대로 `HTML의 요소`를 가리키는 선택자입니다.  
아래는 \<a> 또는 \<h1>에 css를 부여하고 싶을 때 요소 선택자를 사용한 예시입니다.

```css
a {
  propertyname: propertyValue;
}

h1 {
  propertyname: propertyValue;
}
```

## 전체 선택자

전체 선택자는 별표(\*, asterisk)를 사용하여 `전체 요소`를 지정한다.

```css
* {
  propertyname: propertyValue;
}
```

## Class 선택자

Class 선택자는 요소에 지정한 class 속성 값 앞에 점(.)을 붙여서 `해당 class 속성 값을 지니는 요소`를 지정한다.

### html

```html
<h1 class="title">Hello World!</h1>
```
### css

```css
.title {
  color: red;
}
```

## Id 선택자

Id 선택자 또한 Class 선택자와 비슷한 구조를 가집니다. 원하는 요소의 id 속성 값 앞에 샾(#)을 붙여서 `해당 id 속성 값을 지니는 요소`를 지정합니다.

### html

```html
<div id="emphasized-layout"></div>
```

### css

```css
#emphasized-layout {
  background-color: yellow;
}
```