import { axiosInstance } from "./axiosInstance";


export type ToDo = {
    id?: number,
    task: string,
    isDone: boolean,
    date: string
}

export const toDoAPI = {
    async getToDos() {
        const response = await axiosInstance
            .get(`todos2`)
        return response.data
    },

    async addToDo(toDo: ToDo) {
        const response = await axiosInstance
            .post<ToDo>(`todos2/`, toDo)
        return response.status
    },

    async editToDo(id: number, toDo: ToDo) {
        const response = await axiosInstance
            .put<ToDo>(`todos2/${id}`, toDo)
        return response.status
    },

    async deleteToDo(id: number) {
        const response = await axiosInstance
            .delete<ToDo>(`todos2/${id}`)
        return response.status
    },

    async markToDo(id: number, toDo: ToDo) {
        const response = await axiosInstance
            .put<ToDo>(`todos2/${id}`, toDo)
        return response.status
    },
}