import React from 'react'
import { toDoAPI } from '../../../API/toDoAPI';
import { useDate, actions } from '../../../context/Date/Date';
import { Pagination } from '../../Pagination/Pagination';
import DailyCard from '../Card/DailyCard';
import s from './CardsList.module.css';
import { useEffectOnce } from '../../../Hooks/useEffectOnce';

const CardsList: React.FC = React.memo(() => {

  const { state, dispatch } = useDate()

  useEffectOnce(() => {
    const getToDos = async () => {
      const response = await toDoAPI.getToDos()
      dispatch(actions.setToDos(response))
    }
    getToDos()
  })

  return (
    <div className={s.cardsList}>
      {state.weekDates.map((el, i) =>
        <DailyCard key={i} date={el.date} todos={el.todos} />
      )}
      <div className={s.pagination}>
        <Pagination />
      </div>
    </div>
  );
}
)

export default CardsList;
