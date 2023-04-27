import { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import TickIcon from '../components/TickIcon';
import Modal from './Modal';

const ListItems = ({task, getData}) => {
  const [showModal, setShowModal] = useState(false);

  const deleteData = async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
        method: 'DELETE'
      })
      if(response.status ===  200){
        getData();
      }
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon/>
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress}/>
      </div>

      <div className="button-container">
        <button className='edit' onClick={()=>setShowModal(true)}>EDIT</button>
        <button className='delete' onClick={deleteData}>DELETE</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData}/>}
    </li>
  )
}

export default ListItems