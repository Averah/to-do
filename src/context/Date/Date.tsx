import React, { createContext, FC, ReactNode, useContext, useMemo, useReducer } from "react";
import { ToDo } from "../../API/toDoAPI";
import { getWeekDates } from "../../helpers/currentDate/currentDate";

interface Day {
    date: Date;
    todos: ToDo[];
}

interface DateState {
    currentDate: Date;
    weekDates: Day[];
}

const initialState: DateState = {
    currentDate: new Date(),
    weekDates: getWeekDates().map((date) => ({ date, todos: [] })),
}


interface DateContextProps {
    state?: DateState;
    dispatch?: React.Dispatch<any>;
}

const reducer = (state = initialState, action: Actions): DateState => {
    switch (action.type) {
        case 'todo/SET_NEW_WEEK_DATES':
            return {
                ...state,
                weekDates: action.weekDates.map((date) => ({ date, todos: [] }))
            }
        case 'todo/SET_TODOS':
            return {
                ...state,
                weekDates: state.weekDates.map((day) => {
                    return {
                        date: day.date,
                        todos: action.toDos.filter((todo) => todo.date === day.date.toLocaleDateString())
                    }
                })
            }

        default:
            return state;
    }
}


export const actions = {
    setNewWeekDates: (weekDates: Date[]) => ({ type: 'todo/SET_NEW_WEEK_DATES', weekDates } as const),
    setToDos: (toDos: ToDo[]) => ({ type: 'todo/SET_TODOS', toDos } as const)
}

export type InferActionsTypes<T> = T extends { [key: string]: infer U } ? U : never
type Actions = ReturnType<InferActionsTypes<typeof actions>>

const DateContext = createContext<DateContextProps>({});

export const DateProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => {
        return { dispatch, state }
    }, [dispatch, state])

    return (
        <DateContext.Provider value={value}>
            {children}
        </DateContext.Provider>
    )
}

export const useDate = () => {
    return useContext(DateContext) as Required<DateContextProps>;
}