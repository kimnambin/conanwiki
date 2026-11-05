# Next.js 16.4 Cache Components — ConanWiki 적용 검토

- 작성일: 2026-11-05
- 출처: [Next.js 16.4 공식 릴리스 노트](https://nextjs.org/blog/next-16-4) (2026-10-06 배포) — 아래 설명과 코드 예시는 전부 이 글에서 직접 확인한 내용.
- 목적: "Next.js 16.4에서 Cache Components가 모든 앱에 추천된다"는 소식이 ConanWiki(현재 Next.js **16.3.1**)에도 적용 가능한지 코드 기준으로 검토.

## 1. Cache Components가 뭔지 (요약)

기존 App Router는 `fetch()`에 붙이는 `next: {revalidate, tags}` 같은 옵션으로 **암묵적으로** 캐싱 범위가 정해졌다. Next.js 16.4부터 권장되는 새 모델은 컴포넌트(정확히는 async 함수) 단위로 `'use cache'` 지시어를 붙여 **명시적으로** 캐싱 대상을 선언한다.

```jsx
async function Projects({ userId }) {
  'use cache';
  cacheLife('hours'); // next/cache의 cacheLife로 캐시 수명 지정

  const projects = await db.query.projects.findMany({ where: eq(projectsTable.userId, userId) });
  return <div>{/* ... */}</div>;
}
```

활성화는 `next.config.ts`에 플래그 두 개를 추가하는 것으로 시작한다(16.4 기준, 최상위 설정):

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
```

Next.js 17에서는 이 모델이 **기본값**이 될 예정이라고 공식 발표됨.

## 2. ConanWiki의 현재 상태

- `package.json` 기준 `"next": "^16.3.1"`, 실제 설치 버전도 `package-lock.json`에서 `16.3.1`로 고정 확인됨(16.4 아님).
- 캐싱은 전부 **기존 방식(암묵적 fetch 캐싱)**으로 되어 있음. 대표적으로 `src/api/movieApi.ts`:

```ts
// 현재 코드 (server-only, revalidate 방식)
export const fetchMovies = async (): Promise<MovieType[]> => {
  const res = await fetch(
    `${TMDB_BASE}/collection/39199?page=1&language=ko-kr`,
    { headers: tmdbHeaders(), next: {revalidate: 3600} },
  );
  // ...
};

export const fetchMovieDetail = async (id: number): Promise<MovieDetailInfo> => {
  const res = await fetch(
    `${TMDB_BASE}/movie/${id}?append_to_response=videos,credits,release_dates,watch/providers&language=ko-kr`,
    { headers: tmdbHeaders(), next: {revalidate: 3600} },
  );
  // ...
};
```

두 함수 모두 TMDB 응답을 1시간(3600초) 동안 캐시하는 "fetch 레벨 revalidate" 패턴을 쓰고 있고, `src/app/sitemap.ts`도 빌드/요청 시점에 `fetchMovies()`를 호출해 사이트맵을 만듦. 정확히 Cache Components가 대체하려는 "암묵적 캐싱"의 교과서적인 사례임.

## 3. 적용 가능한가?

**결론: 지금 당장은 아니고, 선행 조건이 있음. 적용 자체는 유효한 다음 단계로 판단함.**

1. **버전 업그레이드가 먼저 필요함.** 공식 문서가 "16.4부터 추천"이라고 명시하고 있고, 두 플래그(`cacheComponents`, `partialPrefetching`)가 top-level 설정으로 정리된 것도 16.4 기준이므로, 16.3.1에서 그대로 켜는 것은 검증되지 않은 조합임. `package.json`의 `"^16.3.1"`을 16.4 이상으로 올리는 게 선행 작업.
2. **React 버전 격차도 함께 고려해야 함.** KPI 평가 문서(`docs/KPI_평가.md`)에서 이미 지적했듯 ConanWiki는 React `^18.3.1`을 쓰는데, Next.js 16.4는 React 19.3을 포함한다고 명시되어 있음. Cache Components 자체가 React 19 기능에 의존하는 부분(View Transitions 등)은 아니지만, 16.4 업그레이드와 React 19 업그레이드를 **동시에 몰아서 하지 말라**는 것이 공식 가이드의 권고(마이그레이션 중 원인 추적이 어려워짐)이므로, 순서를 나눠 진행해야 함.
3. **마이그레이션 대상은 명확함.** `movieApi.ts`의 `fetchMovies`/`fetchMovieDetail`이 가장 단순하고 안전한 첫 적용 지점임 — 이미 "조회만 하고 1시간 캐시"라는 명확한 캐시 의도가 있고, 사용자별로 달라지는 값이 없어서(TMDB 공개 데이터) `use cache` 전환에 따른 개인화 데이터 유출 같은 위험이 없음.

### 적용 예시 (제안, 아직 코드에 반영하지 않음)

```ts
// 16.4 업그레이드 + cacheComponents 활성화 후 적용 가능한 형태
import { cacheLife } from 'next/cache';

export const fetchMovies = async (): Promise<MovieType[]> => {
  'use cache';
  cacheLife('hours'); // 기존 revalidate: 3600과 동등한 의도

  const res = await fetch(
    `${TMDB_BASE}/collection/39199?page=1&language=ko-kr`,
    { headers: tmdbHeaders() }, // next: {revalidate} 옵션은 더 이상 필요 없음
  );
  const data = await res.json();
  return data.parts;
};
```

`fetchMovieDetail`도 동일한 방식으로 바꿀 수 있음.

### 주의할 점

- `cacheComponents: true`를 켜면 Next.js가 "정적/동적 경계"를 더 엄격하게 요구함. 캐시되지 않는(요청마다 달라지는) 컴포넌트는 `Suspense`로 감싸야 하는데, ConanWiki의 라우트들(캐릭터·극장판·에피소드 상세)이 전부 공개 콘텐츠라 이 경계가 비교적 단순할 것으로 보이지만, 실제 전환 시 각 페이지에서 빌드 에러가 나는지 하나씩 확인이 필요함(코드 열람만으로는 런타임 동작까지 보증할 수 없음).
- `src/app/sitemap.ts`가 `fetchMovies()`를 직접 호출하는 구조라, `use cache`로 전환해도 호출부 자체는 수정이 필요 없을 것으로 보이지만 빌드 시점 동작(사이트맵 생성이 캐시된 값을 쓰는지, 매 빌드마다 재검증되는지)은 실제 빌드로 확인해야 함.
- 공식 블로그가 안내하는 에이전트 보조 업그레이드 경로(`npx next@canary upgrade --agent=latest`, 그리고 Cache Components 전용 Skill)를 이용하면 이 전환 과정 자체를 도구가 도와줄 수 있음 — 다음에 실제로 업그레이드를 진행할 때 참고할 가치가 있음.

## 4. 결론

ConanWiki는 Cache Components를 적용할 **좋은 후보**지만(공개 데이터만 다루는 단순한 fetch 캐싱 2곳이 명확히 존재), **지금 버전(16.3.1)에서 바로 켤 수는 없고 16.4 이상으로의 업그레이드가 먼저 필요**함. 이 문서는 적용 가능성 검토 및 전환 계획이며, 실제 버전 업그레이드·플래그 활성화·코드 전환·빌드 검증은 별도 작업으로 진행하는 것을 권장함(React 19 업그레이드와는 분리해서 단계적으로).
