interface ITodo {
    id: string
    name: string
    userId: string
    user: string
    isComplete: boolean
  }
  
  interface TodoProps {
    todo: ITodo
  }
  
  type ApiDataType = {
    message: string
    isComplete: boolean
    todos: ITodo[]
    todo?: ITodo
    name: string
    todo: object

  }

  interface User {
    firstName: string
    lastName: string
    id: string
  }