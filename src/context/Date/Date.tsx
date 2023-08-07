import React, { createContext, FC, ReactNode, useContext, useReducer } from "react";
import { getWeekDates } from "../../helpers/currentDate/currentDate";


interface DateState {
    currentDate: Date;
    weekDates: Date[];
}

const initialState: DateState = {
    currentDate: new Date(),
    weekDates: getWeekDates(),
}

interface DateContextProps {
    state?: DateState;
    dispatch?: React.Dispatch<any>;
}

const reducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case 'todo/SET_NEW_WEEK_DATES':
            return {
                ...state,
                weekDates: action.weekDates
            }

        default:
            return state;
    }
}

export const actions = {
    setNewWeekDates: (weekDates: Date[]) => ({ type: 'todo/SET_NEW_WEEK_DATES', weekDates } as const)
}

export type InferActionsTypes<T> = T extends { [key: string]: infer U } ? U : never
type Actions = ReturnType<InferActionsTypes<typeof actions>>


const DateContext = createContext<DateContextProps>({});

export const DateProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DateContext.Provider value={{ dispatch, state }}>
            {children}
        </DateContext.Provider>
    )
}

export const useDate = () => {
    return useContext(DateContext) as Required<DateContextProps>;
}