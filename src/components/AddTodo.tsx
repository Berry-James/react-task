import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import UserSelect from './UserSelect';

type Props = { 
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void 
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>();
  const [open, setOpen ] = React.useState(false);
  const [ userNumber, setUserNumber ] = React.useState('');
  const [complete, setComplete ] = React.useState(true);

  // HANDLE FORM - runs whenever a from option is altered
  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    let theId: any = document.querySelector(".user-select");
    let theRealId = theId.getAttribute('id').toString()
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
      user: theRealId
    })
  };

  const handleUserForm = (e: React.FormEvent<HTMLInputElement>): void => {
    let theId: any = document.querySelector(".user-select");
    let theRealId = theId.getAttribute('id').toString()
    setFormData({
      ...formData,
      'user': theRealId
    })

  }

  // OPEN / CLOSE FOR MODAL
  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };
  
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserNumber(event.target.value as string);
  };

  const toggleComplete = (e: React.FormEvent<HTMLInputElement>): void => {
    complete ? setComplete(false) : setComplete(true)
    setFormData({
      ...formData,
      [e.currentTarget.id]: complete,
    })
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Add Task
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="add-task-modal">
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent className="add-modal-wrapper">
        <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
          <div className="add-project-wrapper">
            <label htmlFor='name'>Project Name</label>
            <div className="input-wrapper">            
              <input onChange={handleForm} type='text' id='name' className='name-input'/>
            </div>
            <div className="add-modal-content">
              <InputLabel>Complete?</InputLabel>
              <Switch className='completed-toggle' onChange={toggleComplete} value={complete} id="isComplete"></Switch>
            </div>
            <div className="add-modal-content">
              <InputLabel id="demo-simple-select-label">User</InputLabel>
              <UserSelect handleChange={handleForm} />
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

export default AddTodo