# 1만 시간의 법칙 계산기

## 목차
- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [개발 환경](#개발-환경)
- [배포 URL](#배포-url)
- [프로젝트 구조](#프로젝트-구조)
- [개발 일정 (WBS)](#개발-일정-wbs)
- [메인 기능 설명](#메인-기능-설명)
- [에러와 해결 과정](#에러와-해결-과정)
- [개발하며 느낀점](#개발하며-느낀점)

---

## 프로젝트 소개

### 목표
"1만 시간의 법칙"을 기반으로 사용자가 원하는 분야의 전문가가 되기 위해 필요한 훈련 기간을 계산해주는 웹 애플리케이션입니다. 사용자가 목표 분야와 하루 훈련 시간을 입력하면, 1만 시간을 채우기 위해 필요한 일수를 계산하여 제공합니다.

### 기능
- 목표 분야 입력 및 하루 훈련 시간 계산
- 1만 시간 달성에 필요한 일수 자동 계산
- 반응형 웹 디자인 (모바일, 태블릿, 데스크톱 대응)
- 응원 모달 팝업
- 결과 공유 기능

---

## 개발 환경

### 기술 스택
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, CSS Variables, 반응형 디자인
- **JavaScript (Vanilla)**: DOM 조작, 이벤트 핸들링
- **Git & GitHub**: 버전 관리

### 웹 표준 및 접근성
- 시맨틱 HTML 구조
- WAI-ARIA 속성 적용 (`aria-live`, `aria-hidden`)
- 스크린 리더 대응 (`.sr-only` 클래스)
- SEO 최적화 (meta 태그, description)

---

## 배포 URL

배포 예정 (GitHub Pages)

```
https://[username].github.io/10000hours
```

---

## 프로젝트 구조

```
10000hours/
├── index.html              # 메인 HTML 파일
├── css/
│   ├── reset.css          # 브라우저 기본 스타일 초기화
│   └── 10000hours.css     # 메인 스타일시트
├── js/
│   └── 10000hours.js      # JavaScript 로직 (현재 HTML 내부로 통합됨)
└── img/
    ├── favicon.ico
    ├── title.png
    ├── clock.png
    ├── quotes.png
    ├── click.png
    ├── licat.png
    └── logo.png
```

---

## 개발 일정 (WBS)

| 단계 | 작업 내용 | 상태 |
|------|----------|------|
| **1주차** | 프로젝트 기획 및 UI/UX 디자인 | ✅ 완료 |
| | HTML 구조 작성 (시맨틱 마크업) | ✅ 완료 |
| **2주차** | CSS 기본 스타일 작성 | ✅ 완료 |
| | 계산기 로직 구현 (JavaScript) | ✅ 완료 |
| | 입력 폼 및 결과 표시 기능 | ✅ 완료 |
| **3주차** | 버튼 인터랙션 스타일 추가 | ✅ 완료 |
| | 응원 모달 구현 (Dialog API) | ✅ 완료 |
| | Footer 영역 추가 | ✅ 완료 |
| **4주차** | 반응형 디자인 구현 (모바일 대응) | ✅ 완료 |
| | 접근성 개선 (ARIA, SEO) | ✅ 완료 |
| | 코드 리팩토링 및 최적화 | ✅ 완료 |
| | 테스트 및 배포 준비 | 🔄 진행 중 |

---

## 메인 기능 설명

### 1. 계산기 기능
사용자가 입력한 목표 분야와 하루 훈련 시간을 바탕으로 1만 시간 달성에 필요한 일수를 계산합니다.

```javascript
// 계산 로직 (index.html:139-161)
const totalHours = 10000;
const days = Math.ceil(totalHours / time);
```

**주요 기능**
- 입력 유효성 검사 (필수 입력, 숫자 범위 1-24시간)
- 올림 계산 (`Math.ceil`)을 통한 정확한 일수 산출
- 동적 결과 표시/숨김 처리

### 2. 응원 모달 (Dialog)
"훈련하러 가기 GO! GO!" 버튼 클릭 시 응원 메시지와 캐릭터가 표시되는 모달 팝업

```javascript
// 모달 구현 (index.html:166-172)
goBtn.addEventListener("click", () => dialog.showModal());
```

**특징**
- HTML5 `<dialog>` 요소 사용
- 접근성 향상 (ESC 키로 닫기, 포커스 관리)
- 배경 어두운 효과 (`::backdrop`)

### 3. 반응형 디자인
모바일(480px 이하) 환경에서 최적화된 레이아웃 제공

```css
/* 모바일 미디어 쿼리 (10000hours.css:435-565) */
@media (max-width: 480px) {
  .hero .title img:first-child {
    width: min(320px, 85vw);
  }
  .calculate-button {
    width: min(567px, calc(100% - 72px - 8px));
  }
}
```

**적용 사항**
- 유동적인 레이아웃 (Flexbox, `flex-wrap`)
- 텍스트 크기 조정 (`clamp()`, `vw` 단위)
- 터치 친화적인 버튼 크기 (최소 64px 높이)

---

## 에러와 해결 과정

### 에러 1: 모바일 환경에서 타이틀 이미지 겹침 문제
**문제 상황**
- 데스크톱에서는 정상적으로 보이던 타이틀과 시계 이미지가 모바일에서 겹쳐 보임
- `position: absolute`로 배치된 시계 이미지의 위치 계산이 모바일에서 부정확

**해결 과정**
```css
/* Before - 고정 크기 */
.hero .title img:last-child {
  width: 262px;
  height: 264px;
}

/* After - 반응형 크기 (10000hours.css:458-464) */
.hero .title img:last-child {
  width: min(220px, 60vw);
  height: auto;
  transform: translate(-50%, -50%);
  opacity: 0.2; /* 배경 장식으로 변경 */
}
```

**배운 점**
- `min()` 함수를 활용한 유동적인 크기 조절
- 작은 화면에서는 장식 요소의 투명도를 조절해 가독성 향상

### 에러 2: 계산 버튼과 손가락 아이콘 배치 문제
**문제 상황**
- 버튼과 아이콘이 별도 요소로 분리되어 있어 모바일에서 정렬이 깨짐
- 버튼이 화면을 넘어가는 경우 아이콘이 엉뚱한 위치에 배치

**해결 과정**
```html
<!-- wrapper로 감싸서 그룹화 (index.html:67-77) -->
<div class="calculate-wrap">
  <button>...</button>
  <img src="./img/click.png" class="click-icon" />
</div>
```

```css
/* 10000hours.css:236-253 */
.calculate-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
}
```

**배운 점**
- 관련된 요소들은 wrapper로 묶어 하나의 단위로 관리
- `inline-flex`와 `fit-content`로 콘텐츠 크기에 맞는 유연한 레이아웃 구현

### 에러 3: 외부 JS 파일 경로 문제
**문제 상황**
- GitHub Pages 배포 시 상대 경로 문제로 JavaScript 파일 로드 실패
- 프로젝트 구조 변경 시 경로 수정 필요

**해결 과정**
```javascript
// 외부 JS 파일을 HTML 내부 <script>로 통합 (commit: 26ed110)
// js/10000hours.js → index.html 내부로 이동
```

**배운 점**
- 소규모 프로젝트에서는 HTML 내부 스크립트가 배포 시 더 안정적
- 파일 분리가 항상 정답은 아니며, 상황에 맞는 선택이 중요

### 에러 4: 결과 영역 초기 상태 관리
**문제 상황**
- JavaScript 로드 전 결과 영역이 잠깐 보이는 FOUC(Flash of Unstyled Content) 발생
- CSS로만 숨기면 스크린 리더가 빈 내용을 읽는 문제

**해결 과정**
```html
<!-- Before: CSS로만 숨김 -->
<div class="result-section" style="display: none;">

<!-- After: HTML 속성 사용 (index.html:81) -->
<div class="result-section" id="resultSection" aria-live="polite" hidden>
```

**배운 점**
- `hidden` 속성은 접근성과 초기 렌더링 모두 해결
- `aria-live="polite"` 추가로 결과 계산 시 스크린 리더 안내

---

## 개발하며 느낀점

### 1. 시맨틱 HTML의 중요성
처음에는 `<div>`와 `<span>`만으로 구조를 만들었지만, `<header>`, `<main>`, `<section>` 등 시맨틱 태그로 리팩토링하면서 코드의 의미가 훨씬 명확해졌습니다. 특히 스크린 리더 사용자를 고려한 `<h1>`, `<h2>` 구조 설계가 접근성 측면에서 얼마나 중요한지 깨달았습니다.

### 2. 반응형 디자인의 어려움과 보람
모바일 반응형을 처음 구현하면서 많은 시행착오를 겪었습니다. 특히 `position: absolute`로 배치된 요소들의 모바일 대응이 가장 어려웠습니다. 하지만 `min()`, `clamp()`, `vw` 단위 등 CSS의 현대적인 기능들을 활용하면서 유연한 레이아웃을 만드는 방법을 배웠습니다.

### 3. 바닐라 JavaScript의 힘
프레임워크 없이 순수 JavaScript만으로 기능을 구현하면서 DOM API와 이벤트 처리에 대한 이해도가 크게 향상되었습니다. 특히 `addEventListener`, `preventDefault`, `hidden` 속성 토글 등 기본기의 중요성을 체감했습니다.

### 4. 접근성(A11y)에 대한 인식 전환
`aria-live`, `aria-hidden`, `.sr-only` 클래스 등을 적용하면서 웹 접근성이 선택이 아닌 필수임을 느꼈습니다. 장식 이미지에 `alt=""` 처리, 의미 없는 요소에 `aria-hidden="true"` 적용 등 작은 디테일이 실제 사용자 경험에 큰 차이를 만든다는 점을 배웠습니다.

### 5. Git 커밋 메시지의 중요성
개발 과정에서 `feat:`, `style:`, `refactor:`, `a11y:` 등의 컨벤션을 사용해 커밋 메시지를 작성했습니다. 나중에 코드 변경 이력을 추적할 때 이러한 규칙이 얼마나 유용한지 실감했고, 협업에서도 필수적인 습관이라는 것을 알게 되었습니다.

### 6. 앞으로의 목표
- TypeScript를 적용해 타입 안정성 확보
- Jest를 활용한 단위 테스트 작성
- 로컬 스토리지를 활용한 계산 기록 저장 기능 추가
- 다크 모드 지원
- 다국어 지원 (i18n)

---

## 라이선스
본 서비스 내 이미지 및 콘텐츠의 저작권은 주식회사 위니브에 있습니다.
