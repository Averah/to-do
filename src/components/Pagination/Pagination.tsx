import React from 'react'
import { toDoAPI } from '../../API/toDoAPI'
import { actions, useDate } from '../../context/Date/Date'
import s from './Pagination.module.css'


export const Pagination: React.FC = () => {

    const { state, dispatch } = useDate()

    const setNextWeekDates = async () => {
        const newWeekDates = state.weekDates.map((day) => {
            return new Date(day.date.setDate(day.date.getDate() + 7))
        })
        dispatch(actions.setNewWeekDates(newWeekDates))
        const response = await toDoAPI.getToDos()
        dispatch(actions.setToDos(response))
    }

    const setPreviousWeekDates = async () => {
        const newWeekDates = state.weekDates.map((day) => {
            return new Date(day.date.setDate(day.date.getDate() - 7))
        })
        dispatch(actions.setNewWeekDates(newWeekDates))
        const response = await toDoAPI.getToDos()
        dispatch(actions.setToDos(response))
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