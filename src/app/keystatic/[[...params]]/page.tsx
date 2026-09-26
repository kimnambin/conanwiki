import {notFound} from 'next/navigation';
import KeystaticApp from '../KeystaticApp';
import {isKeystaticAdminEnabled} from '../../../utils/keystaticAdmin';

// 관리자 API가 꺼진 환경(GitHub App 환경변수 없음)에서는 화면도 노출하지 않는다.
export default function KeystaticPage() {
  if (!isKeystaticAdminEnabled()) notFound();

  return <KeystaticApp />;
}
