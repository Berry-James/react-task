import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import EditTodo from './EditTodo';
import { completeTodo, addTodo, getSingleTodo } from "../API";

type Props = TodoProps & {
  deleteTodo: (id: string) => void
  completeTodo: (id: string) => void
}

const Todo: React.FC<Props> = ({ todo, deleteTodo }) => {
  // check if todo is complete, return true/false
  const checkTodo: boolean = todo.isComplete ? true : false;
  // set state for todo completion status
  let [status, toggleStatus] = useState('');
  // set state for fetching/storing single todo items
  const [singleTodo, setSingleTodo] = useState<ITodo[]>([])

  const handleEditTodo = (e: React.FormEvent, formData: ITodo): void => {
    // stop page from auto reloading
    e.preventDefault()
    // delete the current todo based on its ID
    deleteTodo(todo.id)
    // add new todo from formdata
    addTodo(formData)
    .then(({ status, data }) => {
     if (status !== 201) {
       throw new Error('Error! Todo not saved')
     }
     // set singletodo state to fetched data
     setSingleTodo(singleTodo)
   })
   .catch((err) => console.log(err)) 
  }

  return (
    <div className={`todo-item` + ' ' + status.toString()}> 
      <div>
        <h3 className={status.toString()}>{todo.name}</h3>
      </div>
      <div>
        <h3>{todo.user}</h3>
      </div>
      <div>
          <Checkbox className='checkbox' onChange={() => toggleStatus(status ? '' : 'is-complete')} checked={checkTodo} />
      </div>
      <div className="action-container">
        <Button variant="contained" color="primary" onClick={() => deleteTodo(todo.id)}>Delete</Button>
        <EditTodo saveTodo={handleEditTodo}>Edit</EditTodo>
      </div>
    </div>
  )
}

export default Todo