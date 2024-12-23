//

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovie} from '../../redux/slices/movieSlice';
import {Link} from 'react-router-dom';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function Mo_list() {
  const dispatch = useDispatch();
  const {list, error, loading} = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(fetchMovie());
    // console.log(list);
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>에러...</p>;

  return (
    <div>
      <h2>영화 페이지용</h2>
      {list.length > 0 ? (
        // list <- Redux는 `읽기 전용`이기 때문에 객체를 복사해서 사용해야 함!!
        [...list]
          .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
          .map((movie, index) => {
            return (
              <div key={index}>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
                <p>{movie.title}</p>
                <p>{`https://www.themoviedb.org/movie/${movie.id}`}</p>
              </div>
            );
          })
      ) : (
        <p>영화 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}
