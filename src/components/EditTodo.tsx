import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getSingleTodo, deleteTodo, addTodo } from '../API';

type Props = { 
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void  

}

const EditTodo: React.FC<Props> = ({saveTodo}) => {
  const [formData, setFormData] = useState<ITodo | {}>();
  const [open, setOpen] = React.useState(false);
  const [todo, setTodo] = useState();

  let coolTodo: any = [];

  const fetchTodo = (): void => {
    getSingleTodo('1')
    .then(({ data: { todo } }: any) => coolTodo.push(todo))
    .catch((err: Error) => console.log(err))
  }

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    
    setFormData({
      ...formData,
      name: e.currentTarget.value,
    })
    console.log(e.currentTarget.value)
    console.log(coolTodo)
  };

  const handleClickOpen = () => {
      setOpen(true);
      fetchTodo();
  };

  const handleClose = () => {
      setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
      Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent className="add-modal-wrapper">
        <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
          <div className="add-project-wrapper">
            <label htmlFor='name'>Project Name</label>
            <div className="input-wrapper">            
              <input onChange={handleForm} type='text' id='name' className='name-input'/>
            </div>
          <Button variant="contained" color="secondary" disabled={formData === undefined ? true: false} onClick={(e) => saveTodo(e, formData)}>Add Todo</Button>
          </div>
        </form>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditTodo