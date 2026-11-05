# ConanWiki KPI 평가

- 평가일: 2026-11-05
- 평가 기준: 별도로 정해진 KPI 문서가 없어, 이 프로젝트(정적 콘텐츠 중심의 팬 위키, Next.js App Router + Keystatic CMS)에 맞는 일반적인 기준으로 평가함 — 보안 / 성능 / 접근성 / 코드 품질·테스트 / SEO·콘텐츠
- 평가 방법: 코드 직접 열람 + 설정 파일 확인. 실제 배포 환경(Vercel) 접속이나 `npm run lint` / `npm run test:coverage` 실행 결과는 이 환경에서 확인하지 못했으므로, 코드·설정 근거가 있는 항목만 기재함.

## 요약

| 영역 | 상태 | 핵심 근거 |
|---|---|---|
| 보안 | 양호 | TMDB API 키 서버 전용 처리(`server-only`), 어드민(Keystatic) 비활성 가드, 이미지 도메인 allowlist. 다만 응답 보안 헤더(CSP 등) 전무 |
| 성능 | 양호 | `next/image` 대부분 적용, TMDB fetch `revalidate: 3600`, PWA + 서비스워커 캐시 전략 정상 | 
| 접근성 | 개선 필요 | `jsx-a11y` 린트 미적용, 클릭 가능한 `<div>`에 키보드 접근 불가, 콘텐츠성 이미지에 빈 `alt` |
| 코드 품질·테스트 | 양호~보통 | Vitest 3-트랙(unit/component/storybook) + 커버리지 + CI 연동은 탄탄. ESLint 설정이 Vite 시절 잔재로 Next.js 전환이 덜 됨 |
| SEO·콘텐츠 | 양호 | `metadataBase`/OG/title 템플릿/`sitemap.ts`/`robots.ts` 모두 구성됨. 루트 `layout.tsx`는 메타데이터 없음(의도된 분리 구조로 보임) |

---

## 1. 보안

**양호한 점**
- TMDB API 키는 `src/api/movieApi.ts`에서 `import 'server-only'`와 `process.env.TMDB_API_KEY`(공개 프리픽스 없음)로 서버 전용 처리되어 있음 — `CODE_REVIEW.md`에 기록된 과거(Vite `VITE_` 프리픽스) 키 노출 이슈는 Next.js 전환 과정에서 실질적으로 해결된 상태.
- Keystatic 어드민 라우트(`src/app/api/keystatic/[...params]/route.ts`, `src/app/keystatic/[[...params]]/page.tsx`)는 `isKeystaticAdminEnabled()` 가드로 환경변수(GitHub App 설정) 미설정 시 404 처리 — 빌드 실패 방지와 함께 기본적으로 어드민이 꺼져 있는 구조.
- 운영 환경 CMS 쓰기는 Keystatic의 GitHub Storage 모드(`keystatic.config.ts`)를 사용 — 실제 변경 반영에는 GitHub 저장소 쓰기 권한(OAuth)이 필요해, 별도 비밀번호 체계 없이도 접근 통제가 어느 정도 성립함.
- `next.config.ts`의 이미지 `remotePatterns`가 `image.tmdb.org`로 명확히 scoping되어 있어 임의 도메인 이미지 로딩(SSRF류 리스크) 위험이 낮음.
- 저장소에 `.env` 계열 파일이 커밋되어 있지 않음(확인됨).

**개선 필요**
- `next.config.ts`의 `headers()`는 `/sw.js` 전용 헤더만 정의하고 있고, `Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy` 등 전역 보안 헤더가 전혀 없음. 공개 위키 사이트라 daily-reminder 같은 로그인 서비스보다 리스크는 낮지만, 어드민 라우트(`/keystatic`)가 같은 오리진에 존재하므로 최소한의 clickjacking/CSP 방어선은 두는 것이 안전함.
- `package.json`의 `chromatic` 스크립트에 프로젝트 토큰이 평문으로 하드코딩되어 있음(`npx chromatic --project-token=chpt_...`). Chromatic 토큰은 공개되어도 치명적이진 않지만(퍼블리시 전용), 커밋 이력에 토큰이 남는 것은 모범 사례상 피해야 하며 환경변수(`CHROMATIC_PROJECT_TOKEN`)로 옮기는 것이 좋음.

## 2. 성능

**양호한 점**
- `src/component` 내 대부분의 이미지(홈, 극장판, 캐릭터, 스페셜, 커플 상세 등 11개 파일)가 `next/image`를 사용해 자동 최적화·lazy loading을 적용받음.
- TMDB API 호출에 `next: {revalidate: 3600}` 캐싱이 적용되어 불필요한 외부 요청을 줄임 (`fetchMovies`, `fetchMovieDetail`).
- PWA 구성(`manifest.ts`, `public/sw.js`, 오프라인 페이지)과 서비스워커 캐시 무효화 헤더(`Cache-Control: no-cache, no-store, must-revalidate`, `Service-Worker-Allowed: /`)가 정확히 설정되어 있어, 서비스워커 업데이트 지연 같은 흔한 PWA 버그를 피하고 있음.

**개선 필요**
- `src/component/episode/EpisodeBrowser.tsx`(194번 줄)와 `src/component/app/App_loading.tsx`(11번 줄)에 `next/image`가 아닌 raw `<img>` 태그가 남아있음. `App_loading.tsx`는 로딩 스피너 성격이라 영향이 적지만, `EpisodeBrowser.tsx`의 `<img src={v.img} />`는 캐릭터 카드 그리드에 반복 렌더링되는 콘텐츠 이미지로, 최적화/지연로딩 혜택을 못 받고 있어 실제 성능에 영향을 줄 수 있음.

## 3. 접근성

**개선 필요 (가장 취약한 영역)**
- `eslint-plugin-jsx-a11y`가 설치되어 있지 않아, 일반 빌드/린트(`npm run lint`) 단계에서는 접근성 규칙이 전혀 검사되지 않음. `@storybook/addon-a11y`가 Storybook에는 붙어있지만(`.storybook/main.ts`), 이는 스토리가 작성된 컴포넌트에만 적용되고 앱 전역 커버리지를 보장하지 않음.
- `EpisodeBrowser.tsx`의 캐릭터 카드(180~199번 줄)는 `<div onClick={...}>`로 클릭 인터랙션을 구현하면서 `role`, `tabIndex`, 키보드 핸들러(`onKeyDown`)가 없어 키보드/스크린리더 사용자가 해당 카드를 선택할 수 없음.
- 같은 카드 내 캐릭터 이미지(`<img src={v.img} alt="" />`)가 빈 `alt`로 되어 있음. 장식용 이미지가 아니라 콘텐츠를 나타내는 이미지이므로, 빈 `alt`는 스크린리더 사용자에게 정보 손실을 일으킴.
- `grep` 기준 `aria-*` 속성 사용이 코드 전체에서 10건에 불과해, 커스텀 인터랙티브 요소(카드, 배지 등) 대비 접근성 속성 커버리지가 낮은 편.

## 4. 코드 품질·테스트

**양호한 점**
- Vitest 4가 `unit`(Node, 순수 로직) / `component`(브라우저, RTL) / `storybook`(addon-vitest로 스토리를 실제 테스트화) 3개 프로젝트로 명확히 분리되어 있고(`vitest.config.ts`), 커버리지(`v8` provider)도 설정되어 있음.
- `src/utils/` 쪽 순수 함수들(characterType, koreanInitial, relationshipGraph, specialCast, specialCategory 등)에 대응하는 테스트 파일이 존재.
- GitHub Actions CI(`.github/workflows/ci.yml`)가 lint+typecheck, test+coverage(Playwright 브라우저 캐싱 포함), build, Storybook build를 모두 별도 job으로 돌리고 있어 구성이 탄탄함. `test:coverage` 실패 여부와 무관하게 커버리지 리포트를 아티팩트로 업로드(`if: always()`)하는 점도 실무적으로 합리적.

**개선 필요**
- `eslint.config.*`가 Next.js 전환 이전(Vite 시절) 설정을 그대로 쓰고 있음: `eslint-plugin-react-refresh`(Vite HMR 전용, Next.js에는 불필요), `globals.browser` + `ecmaVersion: 2020` 하드코딩, Next.js 공식 규칙셋(`eslint-config-next`, 특히 `next/core-web-vitals`에 포함된 `jsx-a11y`·이미지 규칙)이 빠져 있음. 마이그레이션이 기능적으로는 끝났지만 린트 설정은 아직 Vite 프로젝트 기준으로 남아있는 상태 — 위 접근성 공백과도 직결됨.
- `bootstrap` + `react-bootstrap` + `styled-components`가 함께 사용되고 있어(package.json), 스타일링 방식이 두 체계로 혼재. 당장 버그를 유발하진 않지만 장기적으로 일관성·번들 크기 관점에서 하나로 통일을 검토할 만함.
- React가 18.3.x로 유지되고 있고(Next.js는 16.3로 최신), 프레임워크와 라이브러리 버전 간 격차가 존재. 즉각적 문제는 아니나 Next.js 16 계열이 React 19를 기본으로 권장하는 추세라 중장기적으로 업그레이드 검토 대상.
- `CODE_REVIEW.md`는 Vite+Redux+React Router 시절 코드 리뷰로, 현재 Next.js App Router 구조와는 맞지 않는 과거 문서임. 혼선을 피하려면 "히스토리 문서"임을 문서 상단에 명시하거나 `docs/` 하위로 이동하는 것을 고려.

## 5. SEO·콘텐츠

**양호한 점**
- `src/app/(site)/layout.tsx`에 `metadataBase`, `title`(default + template), `description`, `robots: {index: true, follow: true}`, Open Graph(title/description/url/siteName/locale/type)가 모두 구성되어 있음.
- `src/app/sitemap.ts`가 정적 라우트뿐 아니라 TMDB에서 가져온 영화 목록과 스페셜 데이터를 동적으로 반영해 사이트맵을 생성함 — 콘텐츠가 늘어나도 자동으로 커버됨.
- `src/app/robots.ts`가 전체 허용 + 사이트맵 경로를 올바르게 지정.
- 각 세부 페이지(movies, characters, episodes, specials, movies/[id], specials/[slug])에 개별 `generateMetadata`/`metadata`가 정의되어 있어, 상세 페이지별 타이틀·설명이 분리됨.
- `manifest.ts`가 한국어 `lang: 'ko'`, 적절한 테마 색상, 192/512/마스커블 아이콘까지 포함해 PWA 설치 경험을 잘 갖추고 있음.

**참고**
- 루트 `src/app/layout.tsx`에는 메타데이터가 없고 `<html lang="ko"><body>` 뼈대만 있음 — 실제 메타데이터는 `(site)/layout.tsx`에서 담당하는 구조로, 라우트 그룹 분리를 고려하면 의도된 설계로 보이며 문제는 아님(참고용으로만 기재).

---

## 종합 의견

전반적으로 보안·성능·SEO는 실무적으로 준수한 수준이며, 특히 TMDB 키 서버 분리, PWA/캐시 전략, 동적 사이트맵은 눈에 띄게 잘 되어 있음. 테스트 인프라(Vitest 3-트랙 + CI)도 이 규모의 프로젝트치고 상당히 탄탄함.

가장 우선적으로 손볼 영역은 **접근성**(jsx-a11y 린트 부재, 클릭 가능한 div의 키보드 미지원, 빈 alt)과 **ESLint 설정의 Next.js 마이그레이션 잔재**임. 두 가지는 서로 연결되어 있어, `eslint-config-next` 도입 한 번으로 상당 부분 동시에 개선될 수 있음. 보안 헤더(CSP 등) 부재와 Chromatic 토큰 하드코딩은 우선순위가 낮은 경미한 항목으로 분류함.
