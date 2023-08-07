import React from 'react'
import { CustomInput } from '../../../UI/CustomInput/CustomInput';
import s from './DailyCard.module.css';
import cn from "classnames";
import { useDate } from '../../../context/Date/Date';

type Props = {
  date: Date
}

const DailyCard: React.FC<Props> = React.memo(({ date }) => {

  const { state } = useDate()
  const stringCardDate = `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.toLocaleDateString()}`

  return (
    <div className={cn(
      {
        [s.currentDate]: date.getDate() === state.currentDate.getDate(),
      },
      s.card
    )}>
      <div className={s.cardDate} >
        {stringCardDate}
      </div>
      <div className={s.todosList}>
        {(Array(10).fill(true).map((_, i) =>
          <CustomInput key={i} />)) 
        }
      </div>
    </div>
  );
}
)

export default DailyCard;

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.value);
  // }

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>,) => {

  //   if (event.key === 'Enter') {
      
  //   }
  // };