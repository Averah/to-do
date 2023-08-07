import React from 'react'
import { actions, useDate } from '../../context/Date/Date'
import s from './Pagination.module.css'


export const Pagination: React.FC = () => {

    const { state, dispatch } = useDate()

    const setNextWeekDates = () => {
        const newWeekDates = state.weekDates.map((date) => {
            return new Date(date.setDate(date.getDate() + 7))
        })
        dispatch(actions.setNewWeekDates(newWeekDates))
    }

    const setPreviousWeekDates = () => {
        const newWeekDates = state.weekDates.map((date) => {
            return new Date(date.setDate(date.getDate() - 7))
        })
        dispatch(actions.setNewWeekDates(newWeekDates))
    }

    return (
        <div className={s.arrows}>
            <div className={s.leftArrow} onClick={setPreviousWeekDates} >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={s.rightArrow} onClick={setNextWeekDates}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )

}