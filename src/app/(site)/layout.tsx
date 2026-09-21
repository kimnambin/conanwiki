import type {Metadata, Viewport} from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import App_navbar from '../../component/app/App_navbar';
import App_bottom from '../../component/app/App_bottom';
import App_footer from '../../component/app/App_footer';
import App_pwaInstall from '../../component/app/App_pwaInstall';

export const metadata: Metadata = {
  metadataBase: new URL('https://conanwiki.vercel.app'),
  title: {
    default: 'ConanWiKi | 명탐정 코난을 소개하는 위키',
    template: '%s | ConanWiKi',
  },
  description:
    '명탐정 코난 등장인물, 극장판, 에피소드 정보를 정리한 팬 위키입니다.',
  robots: {index: true, follow: true},
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
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ConanWiki',
  },
};

export const viewport: Viewport = {
  themeColor: '#00a495',
};

export default function SiteLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <App_navbar />
      {children}
      <App_bottom />
      <App_pwaInstall />
      <App_footer />
    </>
  );
}
