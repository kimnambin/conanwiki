import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '오프라인',
};

export default function OfflinePage() {
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
      <h1 style={{margin: 0}}>인터넷 연결이 끊겼어요</h1>
      <p style={{margin: 0, color: '#6c757d'}}>
        이전에 방문한 페이지는 계속 볼 수 있어요.
        <br />
        네트워크가 다시 연결되면 새로고침 해주세요.
      </p>
    </div>
  );
}
