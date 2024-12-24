// const VIDEO_BASE_URL = 'https://www.youtube.com/embed/';
// const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {MovieDetail} from '../../api/movieApi';
import {useSelector} from 'react-redux';

export default function Mo_detail() {
  const {id} = useParams(); // URL에서 영화 ID 가져오기
  const [moviedata, setMoviedata] = useState(null);
  const {loading, error} = useSelector(state => state.movieKey);

  useEffect(() => {
    const fetchmovie = async () => {
      try {
        const data = await MovieDetail(id);
        setMoviedata(data.results);
      } catch {}
    };

    fetchmovie();
  }, [id]);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  return (
    <div>
      <h2>영화 비디오</h2>
      {moviedata && moviedata.length > 0 ? (
        moviedata.map(video => (
          <div key={video.id}>
            <h3>{video.name}</h3>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              frameBorder="0"
              allowFullScreen></iframe>
          </div>
        ))
      ) : (
        <p>비디오가 없습니다.</p>
      )}
    </div>
  );
}
