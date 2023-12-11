import { FC } from 'react';
import { IMeals } from '../../types';
import MealsItem from './MealsItem.tsx';
import MealsIsEmpty from './MealsIsEmpty.tsx';
import { NavLink } from 'react-router-dom';
import Total from "../Total/Total.tsx";
import {FadeLoader} from "react-spinners";

const Meals: FC<IMeals> = ({ meals,isMealsLoading,total ,onDelete, onEdit}) => {


  return (
    <section className="container mx-auto">
      <div className="flex items-center justify-between pt-3">
        {meals.length > 0 ? (
            <Total total={total}/>
        ) : (
          <MealsIsEmpty />
        )}
        <NavLink className="border rounded-full px-3 py-1" role="button" to="meals/new">Add meal</NavLink>
      </div>
      <div className="">
        {isMealsLoading.loadMeals && <FadeLoader/>}
        {meals.length > 0 ? (
            meals.map((item) => (
                <MealsItem
                    key={item.id}
                    id={item.id}
                    time={item.time}
                    kcal={item.kcal}
                    description={item.description}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))
        ) : (
            <></>
        )}
      </div>
    </section>
  );
};

export default Meals;
