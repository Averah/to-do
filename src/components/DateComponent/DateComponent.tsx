import React from 'react'
import { useDate } from '../../context/Date/Date';
import { getCurrentWeekDay } from '../../helpers/currentDate/currentDate';
import s from './DateComponent.module.css';

const DateComponent: React.FC = React.memo(() => {
  const { state } = useDate();
  const stringDate = `${getCurrentWeekDay(state.currentDate)}, ${state.currentDate.toLocaleDateString()}`

  return (
    <div className={s.currentDate}>
      {stringDate}
    </div>
  );
}
)

export default DateComponent;
