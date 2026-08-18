import type {Metadata} from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import App_navbar from '../component/app/App_navbar';
import App_bottom from '../component/app/App_bottom';
import App_footer from '../component/app/App_footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://conanwiki.vercel.app'),
  title: {
    default: 'ConanWiKi | 명탐정 코난을 소개하는 위키',
    template: '%s | ConanWiKi',
  },
  description:
    '명탐정 코난 등장인물, 극장판, 에피소드 정보를 정리한 팬 위키입니다.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'ConanWiKi',
    description: '명탐정 코난을 소개하는 위키',
    url: '/',
    siteName: 'ConanWiKi',
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    icon: '/conanwiki/conanIcon_11zon.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <App_navbar />
        {children}
        <App_bottom />
        <App_footer />
      </body>
    </html>
  );
}
