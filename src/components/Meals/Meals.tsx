import { FC } from 'react';
import { IMeals } from '../../types';
import MealsItem from './MealsItem.tsx';
import MealsIsEmpty from './MealsIsEmpty.tsx';
import { NavLink } from 'react-router-dom';

const Meals: FC<IMeals> = ({ meals }) => {
  return (
    <section className="container mx-auto">
      <div className="flex content-center justify-between pt-3">
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
          <MealsIsEmpty />
        )}
        <NavLink className="border rounded-full" role="button" to="/meals/new">Add a meal</NavLink>
      </div>
    </section>
  );
};

export default Meals;
