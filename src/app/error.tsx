'use client';

// 세그먼트 전체를 덮는 에러 바운더리. try/catch로 흡수하지 못한
// 예외(예: TMDB 응답 이상, 극장판 상세 조회 실패 등)가 올라왔을 때
// Next.js의 기본 에러 화면 대신 보여준다.
export default function GlobalError({
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px 16px',
        gap: '12px',
      }}>
      <div style={{fontSize: '48px'}}>😵</div>
      <h1 style={{margin: 0}}>페이지를 불러오지 못했어요</h1>
      <p style={{margin: 0, color: '#6c757d'}}>
        일시적인 문제일 수 있어요. 잠시 후 다시 시도해 주세요.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          marginTop: '8px',
          padding: '8px 20px',
          borderRadius: '8px',
          border: 'none',
          background: '#00a495',
          color: '#fff',
          cursor: 'pointer',
        }}>
        다시 시도
      </button>
    </div>
  );
}
