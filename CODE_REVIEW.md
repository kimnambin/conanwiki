# ConanWiKi 코드 리뷰

- 대상: 전체 `src/` 소스
- 스택: React 18 + TypeScript + Vite, Redux Toolkit, React Router 7, react-bootstrap/styled-components, 정적 JSON(캐릭터/커플/에피소드) + TMDB REST API(극장판)

## 프로젝트 구조

```
src/
├── api/        axios 호출 3종 (character, episode, movie)
├── redux/      slice 4개 (character, episode, movie, modal) + store
├── types/      api.model.ts(데이터/상태), component.model.ts(props)
├── component/  app(레이아웃 공통) / character / episode / movie
└── pages/      Character/Movie/EpisodePage (컨테이너 역할)
```

레이어 분리(api → slice → page → presentational component) 자체는 합리적인 구조입니다.

---

## 🔴 실제 동작 버그

### 1. 극장판 상세 라우트 경로 불일치 — 클릭하면 빈 화면
`main.tsx`는 `/conanwiki/movies/:id`(복수형)로 라우트를 등록했지만, 실제 링크는 단수형을 사용합니다.

- `MoviePage.tsx:80` → `` `/conanwiki/movie/${movie.id}` ``
- `App_search.tsx:86` → 동일하게 단수형

목록/검색 어디서 영화를 클릭해도 매칭되는 `<Route>`가 없어 `Mo_detail`이 렌더되지 않습니다.

**상태: ✅ 수정 완료**

### 2. ESLint 설정이 TypeScript를 파싱하지 못함
`eslint.config.js`가 `@typescript-eslint/eslint-plugin`을 규칙(rules)으로만 등록하고 parser를 지정하지 않아, 타입 주석이 있는 거의 모든 `.ts/.tsx` 파일에서 `Parsing error: Unexpected token :`가 발생합니다. 사실상 `npm run lint`가 프로젝트 전체에서 작동하지 않는 상태였습니다.

**상태: ✅ 수정 완료**

### 3. `characterDetail` 썽크의 상태 갱신 위치 오류
```ts
.addCase(characterDetail.pending, (state, action) => {
  state.select = action.payload || null; // pending엔 payload가 없음(항상 undefined)
})
```
`fulfilled`에 있어야 할 로직이 `pending`에 있어 항상 `null`이 됩니다. 현재 이 thunk는 앱 어디서도 dispatch되지 않는 죽은 코드지만, 나중에 연결하면 조용히 실패합니다.

**상태: ✅ 수정 완료**

---

## 🟡 로직/설계 이슈

### 4. `App_readme.tsx` 가드 조건 오류
```ts
if (!openRead) return null; // openRead는 함수 prop → 항상 truthy
```
의도는 `openReadme`(boolean state) 체크로 보이며, `Ch_detail.tsx`의 `if (!open)` 패턴을 복사하면서 prop명을 잘못 넣은 것으로 추정됩니다. react-bootstrap `Modal`이 `show=false`일 때 알아서 렌더링을 생략해 겉으로는 문제없었지만 코드 의도와 실제 동작이 달랐습니다.

**상태: ✅ 수정 완료**

### 5. Redux 상태 타입 설계가 뒤엉켜 있음
- 캐릭터 데이터 타입인 `ApiType`에 `characterKey: CharacterState` 필드가 붙어 있었는데, 이는 `Ch_couple.tsx`에서 루트 상태를 `ApiType`으로 잘못 타이핑한 것을 통과시키기 위한 필드로 보입니다. 다른 모든 컴포넌트는 정상적으로 `ArrayType`을 사용합니다.
- `ArrayType`이 store 구조를 손으로 다시 선언한 것이라 store가 바뀌면 동기화가 깨지기 쉬웠습니다.

**상태: ✅ 수정 완료** — `store.ts`에 `RootState = ReturnType<typeof store.getState>` 도입, `Ch_couple.tsx` 셀렉터 타입 수정, `ApiType`에서 오염된 `characterKey` 필드 제거.

### 6. `any` 타입 사용
`EpisodePage.tsx`의 `selectedSeries.map((ep: any) => ...)`가 타입 안전성을 우회하고 있었습니다.

**상태: ✅ 수정 완료**

---

## 🟢 보안/품질 관찰

### 7. TMDB API 키가 클라이언트 번들에 그대로 노출
`movieApi.ts`가 `import.meta.env.VITE_APP_TMDB_API_KEY`를 `Bearer` 토큰으로 브라우저에서 직접 사용합니다. Vite의 `VITE_` 접두사 env는 빌드 시 번들에 그대로 박히므로, 누구든 devtools로 키를 추출할 수 있습니다(`build/assets/index-*.js`에서 실제 확인됨). `.env`는 git에 커밋되지 않아 그 부분은 안전하지만, 키 자체가 공개되는 구조는 동일합니다.

**상태: ⏭️ 이번 리팩토링 범위 밖** — 해결하려면 서버리스 함수(Vercel API route 등)로 TMDB 호출을 프록시하는 아키텍처 변경이 필요해 별도 작업으로 분리를 권장합니다.

### 8. 중복 코드
`Ep_characher.tsx`에서 kidcases/cases, kidmovies/movies 블록이 데이터 소스만 다르고 JSX가 거의 동일하게 두 번씩 반복되었습니다.

**상태: ✅ 수정 완료**

### 9. 자잘한 것들
- `CharacterPage.tsx`의 `const isMobile = window.innerWidth;` — 이름과 달리 boolean이 아니었고, 마운트 시 1회만 계산되어 리사이즈에 반응하지 않았습니다.
- 리스트 `key`로 `idx`를 쓰는 곳이 다수 — 안정적인 id가 있는 데이터는 그걸 키로 사용하도록 변경.
- `movieApi.ts`의 `catch`에서 원본 에러를 버리고 `throw new Error('에러')`로 대체 — 실패 원인 추적이 어려웠음.

**상태: ✅ 수정 완료**

---

## 요약

| # | 이슈 | 심각도 | 상태 |
|---|------|--------|------|
| 1 | 극장판 상세 라우트 경로 불일치 | 🔴 High | ✅ |
| 2 | ESLint parser 미설정 | 🔴 High | ✅ |
| 3 | characterDetail pending/fulfilled 버그 | 🔴 Medium(dead code) | ✅ |
| 4 | App_readme 가드 조건 오류 | 🟡 Medium | ✅ |
| 5 | Redux 상태 타입 설계 | 🟡 Medium | ✅ |
| 6 | `any` 타입 사용 | 🟡 Low | ✅ |
| 7 | TMDB API 키 클라이언트 노출 | 🟢 보안 참고 | ⏭️ 범위 밖 |
| 8 | Ep_characher 중복 코드 | 🟢 Low | ✅ |
| 9 | isMobile/key/에러 처리 등 | 🟢 Low | ✅ |
