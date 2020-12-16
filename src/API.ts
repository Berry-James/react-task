import axios, { AxiosResponse } from 'axios';

const baseURL: string = "api/";

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    document.body.classList.add("is-loading")
    try {
        const todos: AxiosResponse<ApiDataType> = await axios.get(
            baseURL + "todos"
        )
        document.body.classList.remove("is-loading")
        return todos
    } catch (error) {
        document.body.classList.remove("is-loading")
        throw new Error(error)
    }
}

export const getUsers = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const users: AxiosResponse<ApiDataType> = await axios.get(
            baseURL + "users"
        )
        return users
    } catch (error) {
        throw new Error(error)
    }
}

export const addTodo = async (
    formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const todo: Omit<ITodo, "id"> = {
            name: formData.name,
            userId: formData.userId,
            isComplete: formData.isComplete,
            user: formData.userId
        }
        const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
            baseURL + "todo/create",
            todo
        )
        return saveTodo
        
    } catch (error) {
        throw new Error(error)
    }
}


export const completeTodo = async (
    id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const completedTodo: AxiosResponse<ApiDataType> = await axios.get(
            `${baseURL}todo/${id}`
        )
        return completedTodo
    } catch (error) {
        throw new Error(error)
    }
}


export const deleteTodo = async (
    id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseURL}todo/${id}/delete`
        )
        return deletedTodo 
    } catch (error) {
        throw new Error(error)
    }
}

export const getSingleTodo = async (id: string): Promise<AxiosResponse<ApiDataType>> => {
    document.body.classList.add("is-loading")
    try {
        const todo: AxiosResponse<ApiDataType> = await axios.get(
            baseURL + "todo/" + id
        )
        document.body.classList.remove("is-loading")
        return todo
    } catch (error) {
        document.body.classList.remove("is-loading")
        throw new Error(error)
    }
}