import type {Metadata} from 'next';
import SpecialBrowser from '@/component/special/SpecialBrowser';
import specialsData from '@/data/specials.json';
import {SpecialType} from '@/types/api.model';

export const metadata: Metadata = {
  title: '콜라보/스페셜',
  description:
    '명탐정 코난의 콜라보 작품, TV 스페셜, 총집편을 한곳에 모았어요. 개봉순·최신순으로 정렬하고 분류별로 골라볼 수 있어요.',
};

export default function SpecialsPage() {
  const specials = specialsData as unknown as SpecialType[];

  return <SpecialBrowser specials={specials} />;
}
