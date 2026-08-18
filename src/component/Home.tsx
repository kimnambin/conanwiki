import Link from 'next/link';
import './home.css';

interface HomeFeature {
  to: string;
  img: string;
  title: string;
  desc: string;
  accent: string;
  accentSoft: string;
  bgFrom: string;
  bgTo: string;
}

const FEATURES: HomeFeature[] = [
  {
    to: '/characters',
    img: '/conanwiki/conancha.webp',
    title: '등장인물',
    desc: '명탐정 코난 등장인물 모음',
    accent: '#f2a33c',
    accentSoft: 'rgba(242, 163, 60, 0.5)',
    bgFrom: '#3a2711',
    bgTo: '#181008',
  },
  {
    to: '/movies',
    img: '/conanwiki/conanMo_11zon.webp',
    title: '극장판',
    desc: '명탐정 코난 극장판 모음',
    accent: '#00c2a8',
    accentSoft: 'rgba(0, 194, 168, 0.5)',
    bgFrom: '#0d2a26',
    bgTo: '#061412',
  },
  {
    to: '/episodes',
    img: '/conanwiki/conanEpi_11zon.webp',
    title: '에피소드',
    desc: '명탐정 코난 중요 에피소드 모음',
    accent: '#e0507a',
    accentSoft: 'rgba(224, 80, 122, 0.5)',
    bgFrom: '#33121e',
    bgTo: '#15070c',
  },
];

// 홈 화면의 둘러보기 카드. 데이터가 정적이라 Server Component로 그대로
// 렌더링되고, 초기 HTML 응답에 실제 링크/텍스트가 그대로 포함된다.
export default function Home() {
  return (
    <section className="home-features">
      <h2 className="home-features__title">둘러보기</h2>
      <div className="home-features__grid">
        {FEATURES.map(f => {
          const cardVars = {
            '--accent': f.accent,
            '--accent-soft': f.accentSoft,
            '--bg-from': f.bgFrom,
            '--bg-to': f.bgTo,
          } as React.CSSProperties;

          return (
            <Link
              href={f.to}
              key={f.to}
              className="home-feature-card"
              style={cardVars}>
              <div className="home-feature-card__img">
                <img src={f.img} alt={f.title} />
              </div>
              <div className="home-feature-card__shade" />
              <div className="home-feature-card__body">
                <h3 className="home-feature-card__title">{f.title}</h3>
                <p className="home-feature-card__desc">{f.desc}</p>
                <span className="home-feature-card__cta">바로가기 →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
