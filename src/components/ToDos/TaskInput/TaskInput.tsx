import React, { useState } from "react";
import { CustomInput } from "../../../UI/CustomInput/CustomInput";
import { useEffect, useRef } from 'react';
import s from './TaskInput.module.css';
import trashIcon from './../../../images/trashIcon.png'
import cn from 'classnames'

type Props = {
  initialValue?: string,
  id?: number,
  isDone: boolean
  submitTask: (value: string, isDone: boolean, id?: number) => void,
  deleteTask: (id: number) => void,
  markToDoStatus: (id: number, isDone: boolean, value: string) => void,
}

export const TaskInput: React.FC<Props> = React.memo(({ initialValue, id, submitTask, deleteTask, isDone, markToDoStatus }) => {

  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const saveToDo = () => {
    if (value) {
      submitTask(value, isDone, id)
      setValue(initialValue)
    }
  }
  const taskInput = useRef<HTMLInputElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      if (taskInput.current != null) {
        taskInput.current.blur()
      }
    }
  };

  const deleteToDo = (event: React.MouseEvent<HTMLImageElement>) => {
    if (id) {
      deleteTask(id)
    };
  }

  const changeToDoStatus = () => {
    if (id && value) {
      const toDoStatus = !isDone
      markToDoStatus(id, toDoStatus, value)
    }
  }

  if (initialValue) {

    return (
      <div className={s.taskInput}>
        <CustomInput value={value} onChange={(e) => setValue(e.target.value)}
          onBlur={saveToDo} onKeyDown={handleKeyDown} ref={taskInput} className={cn({ [s.inputDone]: isDone })} />
        <span className={cn(s.checkmark, { [s.done]: isDone } )} onClick={changeToDoStatus}>✓</span>
        <img src={trashIcon} alt="Delete todo icon" className={s.trashIcon} onClick={deleteToDo} />
      </div>
    )
  }

  return (
    <div className={s.taskInput}>
      <CustomInput value={value} onChange={(e) => setValue(e.target.value)}
        onBlur={saveToDo} onKeyDown={handleKeyDown} ref={taskInput} />
    </div>
  );
})

