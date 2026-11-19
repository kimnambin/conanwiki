import type {MetadataRoute} from 'next';
import {fetchMoviesSafe} from '../api/movieApi';
import specials from '../data/specials.json';

const SITE_URL = 'https://conanwiki.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // sitemap.xml 자체가 빌드/배포를 막으면 안 되므로, TMDB 장애 시에는
  // 극장판 상세 URL만 빠진 채로 사이트맵을 계속 생성한다.
  const movies = await fetchMoviesSafe();

  const staticRoutes: MetadataRoute.Sitemap = [
    {url: `${SITE_URL}/`, priority: 1},
    {url: `${SITE_URL}/characters`, priority: 0.9},
    {url: `${SITE_URL}/movies`, priority: 0.9},
    {url: `${SITE_URL}/specials`, priority: 0.9},
    {url: `${SITE_URL}/episodes`, priority: 0.9},
  ];

  const movieRoutes: MetadataRoute.Sitemap = movies.map(movie => ({
    url: `${SITE_URL}/movies/${movie.id}`,
    priority: 0.7,
  }));

  const specialRoutes: MetadataRoute.Sitemap = specials.map(special => ({
    url: `${SITE_URL}/specials/${special.slug}`,
    priority: 0.7,
  }));

  return [...staticRoutes, ...movieRoutes, ...specialRoutes];
}
