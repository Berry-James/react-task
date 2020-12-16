import React, { useEffect, useState } from 'react';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import Container from '@material-ui/core/Container';
import { getTodos, addTodo, deleteTodo, completeTodo } from './API';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
    .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
    .catch((err: Error) => console.log(err))
  }

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()
    addTodo(formData)
    .then(({ status, data }) => {
      if (status !== 201) {
        throw new Error('Error! Todo not saved')
      }
      if (status === 201) {
      }
      setTodos(todos)
      fetchTodos()
    })
    .catch((err) => console.log(err))
  }

  const handleDeleteTodo = (id: string): void => {
    deleteTodo(id)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted')
        }
        setTodos(todos)
        fetchTodos()
      })
      .catch((err) => console.log(err))
  }

  const handleCompleteTodo = (id: string): void => {
    completeTodo(id)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted')
        }
      })
      .catch((err) => console.log(err))
  }
  
  // NAME FILTER
  // set sort state (i.e. direction to sort in)
  const [nameSort, setNameSort] = useState('');
  const filterName = () => {
    // if sort is empty or descending, set to ascending and sort todo array
    if(nameSort == '' || nameSort == 'descending') {
      todos.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? - 1 : Number(a.name.toUpperCase() > b.name.toUpperCase()));
      setNameSort('ascending')
    } else {
      // if sort is ascending, set to descending and sort todo array
      todos.sort((a, b) => b.name.toUpperCase() < a.name.toUpperCase() ? - 1 : Number(b.name.toUpperCase() > a.name.toUpperCase()));
      setNameSort('descending')
    }
  }

  // USER FILTER
  const [userSort, setUserSort] = useState('');
  const filterUser = () => {
    // if sort is empty or descending, set to ascending and sort todo array
    if(userSort == '' || userSort == 'descending') {
      todos.sort((a, b) => a.user < b.user ? - 1 : Number(a.user > b.user));
      setUserSort('ascending')
    } else {
      // if sort is ascending, set to descending and sort todo array
      todos.sort((a, b) => b.user < a.user ? - 1 : Number(b.user > a.user));
      setUserSort('descending')
    }

  }

  // COMPLETED FILTER
  const [completedSort, setCompletedSort] = useState('');
  const filterCompleted = () => {
    // if sort is empty or descending, set to ascending and sort todo array
    if(completedSort == '' || completedSort == 'descending') {
      todos.sort((a, b) => a.isComplete < b.isComplete ? - 1 : Number(a.isComplete > b.isComplete));
      setCompletedSort('ascending')
    } else {
      // if sort is ascending, set to descending and sort todo array
      todos.sort((a, b) => b.isComplete < a.isComplete ? - 1 : Number(b.isComplete > a.isComplete));
      setCompletedSort('descending')
    }
  }

  return (
    <main className='App'>
      <section className="main-container">
        <Container className="todo-container">
          <AddTodo saveTodo={handleSaveTodo} />
          <Container className="todo-list-container">
            <div className="todo-list-headings">
              <a onClick={() => {filterName()}}>Name</a>
              <a onClick={() => {filterUser()}}>User</a>
              <a onClick={() => {filterCompleted()}}>Completed</a>
              <p>Actions</p>
            </div>
            <div className="todos-container">
            {todos.map((todo: ITodo) => (
              <TodoItem
                key={todo.id}
                deleteTodo={handleDeleteTodo}
                completeTodo={handleCompleteTodo}
                todo={todo}
              />
            ))}
            </div>
          </Container>
        </Container>
      </section>
    </main>
  )
}

export default App