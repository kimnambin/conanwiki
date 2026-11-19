'use client';

export default function Error({
  unstable_retry,
}: {
  error: Error & {digest?: string};
  unstable_retry: () => void;
}) {
  return (
    <div
      role="alert"
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
      <div style={{fontSize: '48px'}}>⚠️</div>
      <h1 style={{margin: 0}}>문제가 발생했어요</h1>
      <p style={{margin: 0, color: '#6c757d'}}>
        데이터를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => unstable_retry()}>
        다시 시도
      </button>
    </div>
  );
}
