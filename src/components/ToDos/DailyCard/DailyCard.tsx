import React, { useCallback } from 'react'
import s from './DailyCard.module.css';
import cn from "classnames";
import { actions, useDate } from '../../../context/Date/Date';
import { TaskInput } from '../TaskInput/TaskInput';
import { ToDo, toDoAPI } from '../../../API/toDoAPI';

type Props = {
  date: Date;
  todos: ToDo[]
}

const DailyCard: React.FC<Props> = React.memo(({ date, todos }) => {

  const { state, dispatch } = useDate()

  const stringCardDate = `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${date.toLocaleDateString()}`

  const taskInputs: ToDo[] = Array(10).fill(undefined).map((_, idx) => {
    if (todos && todos.length && todos[idx]) {
      return todos[idx];
    };
    return {
      isDone: false,
      task: '',
      date: '',
    }
  })

  const submitTask = useCallback(async (value: string, isDone: boolean, id?: number, ) => {
    if (id) {
      await toDoAPI.editToDo(id, {
        id: id,
        task: value,
        isDone: isDone,
        date: date.toLocaleDateString()
      })
    } else {
      await toDoAPI.addToDo({
        id: Date.now(),
        task: value,
        isDone: false,
        date: date.toLocaleDateString()
      })
    }

    const response = await toDoAPI.getToDos()
    dispatch(actions.setToDos(response))
  }, [date, dispatch])

  const deleteTask = useCallback(async (id: number) => {
    await toDoAPI.deleteToDo(id)
    const response = await toDoAPI.getToDos()
    dispatch(actions.setToDos(response))
  }, [dispatch])

  const markToDoStatus = useCallback(async (id: number, isDone:boolean, value: string) => {
    await toDoAPI.markToDo(id, {
      id: id,
      task: value,
      isDone: isDone,
      date: date.toLocaleDateString()

    }
      
    )
    const response = await toDoAPI.getToDos()
    dispatch(actions.setToDos(response))
  }, [dispatch, date])

  return (
    <div className={cn(
      {
        [s.currentDate]: date.toLocaleDateString() === state.currentDate.toLocaleDateString(),
      },
      s.card
    )}>
      <div className={s.cardDate} >
        {stringCardDate}
      </div>
      <div className={s.todosList}>
        {taskInputs.map((todo, idx) =>
          <TaskInput key={idx} initialValue={todo.task} submitTask={submitTask}
            id={todo.id} deleteTask={deleteTask} isDone={todo.isDone} markToDoStatus={markToDoStatus}/>)}
      </div>
    </div>
  );
}
)

export default DailyCard;
