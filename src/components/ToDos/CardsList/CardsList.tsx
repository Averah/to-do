import React from 'react'
import { useDate } from '../../../context/Date/Date';
import { Pagination } from '../../Pagination/Pagination';
import DailyCard from '../Card/DailyCard';
import s from './CardsList.module.css';


const CardsList: React.FC = React.memo(() => {
  const { state } = useDate()
  // const [toDos, setToDos] = useState<toDo[]>([])

  // useEffect(() => {
  //   const getToDos = async () => {
  //     const response = await toDoApi.getToDos()
  //     setToDos(response)
  //   }
  //   getToDos()
  // }, [])

  return (
    <div className={s.cardsList}>
      {state.weekDates.map((el, i) =>
        <DailyCard key={i} date={el} />
      )}
      <div className={s.pagination}>
        <Pagination />
      </div>
    </div>
  );
}
)

export default CardsList;
