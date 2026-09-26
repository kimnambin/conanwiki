import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ConanWiki | 명탐정 코난을 소개하는 위키',
    short_name: 'ConanWiki',
    description:
      '명탐정 코난 등장인물, 극장판, 에피소드 정보를 정리한 팬 위키입니다.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#00a495',
    lang: 'ko',
    icons: [
      {src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png'},
      {src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png'},
      {
        src: '/icons/maskable-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
