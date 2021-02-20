# Mixin Ver2

**개발자를 위한 커뮤니티 사이트**

## 팀원

- 프론트: 아카, 조드, 캐시, 타코, 동화

## 실행방법

- 현재 프로젝트를 로컬에 위치시킨 후 프로젝트 최상위 경로에서 아래 명령어 실행

  ```Shell
  npm install
  npm run dev #next 실행
  ```

- localhost:3060으로 접속하여 결과 확인

## 사용기술

### Language library

- [Next.js](https://nextjs.org/), [React](https://ko.reactjs.org/docs/getting-started.html)

### Third Party library

Mobx, axios, SASS, TailwindCss,
[swr](https://swr.vercel.app/)

### Bundling

- Webpack

## 공부하기

- [React](https://www.youtube.com/watch?v=V3QsSrldHqI&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn)

## 브랜치 전략

Git Flow방식을 사용하여 브랜치를 관리한다.

1. master : 배포 버전 소스(release브랜치를 통해서만 merge)
2. dev : 개발 완료된 소스(master브랜치에서 분리)
3. feat/{기능} : 새로운 기능 개발(develop에서 분리되며 완료 시 develop에 PR)

- 개발 진행 시 develop에서 브랜치를 분리하여 기능작업 후 develop에 병합을 수행한다.

## commit 컨벤션

- feat: ⚡ 새로운 기능
- fix: 🔥 버그 수정
- refactor: 🛠 버그를 수정하거나 기능을 추가하지 않는 코드 변경
- chore: 📦 src 또는 테스트 파일을 수정하지 않는 기타 변경 사항
- docs: 📚 문서만 변경
- style: 💅 코드의 의미에 영향을 미치지 않는 변경 사항 (공백, 서식, 누락 된 세미콜론 등)
- 주의 ) 커밋 메시지에 이슈번호를 기입할 것 ( SM-14 )
- 예시 ) feat: ⚡ SM-14 테스트커밋
