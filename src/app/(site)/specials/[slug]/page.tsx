import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Sp_detail from '@/component/special/Sp_detail';
import specialsData from '@/data/specials.json';
import {fetchCharacters} from '@/api/keystaticApi';
import {SpecialType} from '@/types/api.model';
import {findSpecialCharacters} from '@/utils/specialCast';
import {sortSpecialsByRelease} from '@/utils/specialCategory';

const specials = specialsData as unknown as SpecialType[];

interface SpecialDetailPageProps {
  params: Promise<{slug: string}>;
}

// 정적 데이터라 빌드 타임에 전체 상세 페이지를 미리 생성한다.
export async function generateStaticParams() {
  return specials.map(special => ({slug: special.slug}));
}

export async function generateMetadata({
  params,
}: SpecialDetailPageProps): Promise<Metadata> {
  const {slug} = await params;
  const special = specials.find(s => s.slug === slug);

  if (!special) {
    return {title: '작품을 찾을 수 없어요'};
  }

  return {
    title: special.title,
    description: special.overview,
    openGraph: {
      title: special.title,
      description: special.overview,
      images: [special.poster],
    },
  };
}

export default async function SpecialDetailPage({
  params,
}: SpecialDetailPageProps) {
  const {slug} = await params;
  const special = specials.find(s => s.slug === slug);

  if (!special) {
    notFound();
  }

  const characters = await fetchCharacters();
  const appearingCharacters = findSpecialCharacters(
    special.characters,
    characters,
  );

  const ordered = sortSpecialsByRelease(specials, 'asc');
  const currentIndex = ordered.findIndex(s => s.slug === special.slug);
  const prev = currentIndex > 0 ? ordered[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < ordered.length - 1
      ? ordered[currentIndex + 1]
      : null;

  const toNav = (s: SpecialType | null) =>
    s ? {slug: s.slug, title: s.title, poster: s.poster} : null;

  return (
    <Sp_detail
      special={special}
      appearingCharacters={appearingCharacters}
      prevSpecial={toNav(prev)}
      nextSpecial={toNav(next)}
    />
  );
}
