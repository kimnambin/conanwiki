import Link from 'next/link';

export default function NotFound() {
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
      <div style={{fontSize: '48px'}}>🔍</div>
      <h1 style={{margin: 0}}>페이지를 찾을 수 없어요</h1>
      <p style={{margin: 0, color: '#6c757d'}}>
        주소가 잘못되었거나 삭제된 페이지예요.
      </p>
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  );
}
