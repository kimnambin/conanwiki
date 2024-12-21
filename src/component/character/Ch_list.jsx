import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {character, characterDetail} from '../../redux/slices/characterSlice';
import Ch_detail from './Ch_detail';

export default function Ch_list() {
  const dispatch = useDispatch();
  const {list, loading, error} = useSelector(state => state.character);

  const [openDetail, setOpenDetail] = useState(false);
  const [select, setSelect] = useState(null);

  useEffect(() => {
    dispatch(character());
  }, [dispatch]);

  const clickCharacher = id => {
    dispatch(characterDetail(id));
    console.log('클릭됨', id);
  };

  const open = id => {
    console.log('클릭됨', id);
    console.log('모달창여부', openDetail);
    setSelect(id);
    setOpenDetail(true);
  };

  const close = () => {
    setSelect(null);
    setOpenDetail(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>에러...</p>;

  return (
    <div>
      {/* 이곳은 이름이랑 이미지만 넣으면 될듯용 */}
      <ul>
        {list.map(item => (
          <li key={item.name.english.anime}>
            <h3
              // onClick={() => clickCharacher(item.name.english.anime)}
              onClick={() => open(item)}>
              {item.name.english.anime}
            </h3>
            {/* <img */}
          </li>
        ))}
      </ul>
      <Ch_detail open={openDetail} close={close} character={select} />
    </div>
  );
}
