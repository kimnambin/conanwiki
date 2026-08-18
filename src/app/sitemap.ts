import type {MetadataRoute} from 'next';
import {fetchMovies} from '../api/movieApi';

const SITE_URL = 'https://conanwiki.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const movies = await fetchMovies();

  const staticRoutes: MetadataRoute.Sitemap = [
    {url: `${SITE_URL}/`, priority: 1},
    {url: `${SITE_URL}/characters`, priority: 0.9},
    {url: `${SITE_URL}/movies`, priority: 0.9},
    {url: `${SITE_URL}/episodes`, priority: 0.9},
  ];

  const movieRoutes: MetadataRoute.Sitemap = movies.map(movie => ({
    url: `${SITE_URL}/movies/${movie.id}`,
    priority: 0.7,
  }));

  return [...staticRoutes, ...movieRoutes];
}
