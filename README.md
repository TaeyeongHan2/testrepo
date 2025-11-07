# 오늘 할 일 - TODO 웹앱

브라우저 로컬스토리지를 사용하는 간단하고 모던한 TODO 웹 애플리케이션입니다.

## 주요 기능

- 할 일 추가, 완료, 삭제
- 로컬스토리지를 사용한 데이터 저장 (브라우저에 영구 저장)
- 전체/진행중/완료 필터링
- 완료된 항목 일괄 삭제
- 반응형 디자인 (모바일, 태블릿, 데스크톱 지원)
- 오늘 날짜 자동 표시

## 사용 방법

1. 할 일 입력란에 할 일을 입력하고 "추가" 버튼을 클릭하거나 Enter 키를 누릅니다.
2. 체크박스를 클릭하여 할 일을 완료/미완료로 표시할 수 있습니다.
3. "삭제" 버튼을 클릭하여 개별 항목을 삭제할 수 있습니다.
4. 필터 버튼(전체/진행중/완료)을 사용하여 원하는 항목만 볼 수 있습니다.
5. "완료된 항목 삭제" 버튼으로 완료된 모든 항목을 한번에 삭제할 수 있습니다.

## GitHub Pages 배포 방법

1. GitHub 저장소의 Settings로 이동
2. 왼쪽 메뉴에서 "Pages" 클릭
3. Source에서 "Deploy from a branch" 선택
4. Branch에서 "main" 브랜치와 "/ (root)" 폴더 선택
5. Save 버튼 클릭
6. 몇 분 후 `https://[username].github.io/[repository-name]/` 에서 확인 가능

## 기술 스택

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- LocalStorage API

## 파일 구조

```
.
├── index.html      # 메인 HTML 파일
├── style.css       # 스타일시트
├── app.js          # JavaScript 로직
└── README.md       # 프로젝트 설명
```

## 브라우저 호환성

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 라이선스

MIT License