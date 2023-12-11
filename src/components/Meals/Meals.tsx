import { FC } from 'react';
import { IMeals } from '../../types';
import MealsItem from './MealsItem.tsx';
import MealsIsEmpty from './MealsIsEmpty.tsx';
import { NavLink } from 'react-router-dom';
import Total from "../Total/Total.tsx";

const Meals: FC<IMeals> = ({ meals }) => {
  return (
    <section className="container mx-auto">
      <div className="flex items-center justify-between pt-3">
        {meals.length > 0 ? (
            <Total total={1}/>
        ) : (
          <MealsIsEmpty />
        )}
        <NavLink className="border rounded-full px-3 py-1" role="button" to="meals/new">Add meal</NavLink>
      </div>
      <div className="">
        {meals.length > 0 ? (
            meals.map((item) => (
                <MealsItem
                    key={item.id}
                    time={item.time}
                    kcal={item.kcal}
                    description={item.description}
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
