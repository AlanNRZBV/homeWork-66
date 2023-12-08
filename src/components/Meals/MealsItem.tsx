import {FC} from 'react';
import {IMealsItem} from "../../types";
import {NavLink} from "react-router-dom";

const MealsItem: FC<IMealsItem> = ({time,kcal,description}) => {
  return (
      <div>
        <span>{time}</span>
        <p>{description}</p>
        <span>{kcal}</span>
        <NavLink to="/meals/new">Edit</NavLink>
        <button type="button">Delete</button>
      </div>
  );
};

export default MealsItem