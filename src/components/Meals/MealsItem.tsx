import {FC} from 'react';
import {IMealsItem} from "../../types";
import {NavLink} from "react-router-dom";

const MealsItem: FC<IMealsItem> = ({time,kcal,description,onDelete,id, onEdit}) => {

  const deleteHandler = ()=>{
    if (onDelete && id){
      console.log('click on delete')
      onDelete(id)
    }
  }

  const editHandler =()=>{
    if (onEdit && id){
      console.log('click on edit')
      onEdit(id)
    }
  }
  return (
      <div className="flex border-2 p-3 rounded-2xl justify-between">
        <div>
        <span>Time: {time}</span>
        <p>Description: {description}</p>
        <span>Calories: {kcal}(kcal)</span>
        </div>
        <div className="flex items-start">

        <NavLink onClick={editHandler} className="me-2 border rounded px-2 py-1" to="/meals/new">Edit</NavLink>
        <button onClick={deleteHandler} className="me-2 border rounded px-2 py-1" type="button">Delete</button>
        </div>
      </div>
  );
};

export default MealsItem