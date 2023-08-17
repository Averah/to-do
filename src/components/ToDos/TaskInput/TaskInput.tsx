import React, { useState } from "react";
import { CustomInput } from "../../../UI/CustomInput/CustomInput";
import { useEffect } from 'react';


type Props = {
  initialValue?: string,
  submitTask: (value: string, id?: number) => void,
  id?: number

}

export const TaskInput: React.FC<Props> = React.memo(({ initialValue, submitTask, id }) => {

  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const setToDo = () => {
    if (value) {
      submitTask(value, id)
      setValue(initialValue)
    }
  }

  return (
    <CustomInput value={value} onChange={(e) => setValue(e.target.value)} onBlur={setToDo} />
  );
})

