import { axiosInstance } from "./axiosInstance";


export type toDo = {
    id: number,
    date: string,
    task: string,
    isDone: boolean

}
export type ToDos = toDo[]

export const toDoApi = {
    async getToDos () {
        const response = await axiosInstance
        .get(`todos/`)
        return response.data
    },

    async addToDo (toDo: toDo) {
        const response = await axiosInstance
        .post<toDo>(`todos/${toDo.id}`)
        return response.data
    }
}