import React, { useCallback, useEffect, useState } from 'react';
import { IisLoading, IMealsItem, IOptions, MealItem } from '../../types';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Meals from '../../components/Meals/Meals.tsx';
import MealTool from '../../components/MealTool/MealTool.tsx';
import axiosApi from '../../axiosApi.ts';

const App = () => {

  const navigate = useNavigate()

  const [meals, setMeals] = useState<IMealsItem[]>([]);
  const [isLoading, setIsLoading] = useState<IisLoading>({
    loadMeals: false,
  });

  const [meal, setMeal] = useState<MealItem>({
    time: '',
    description: '',
    kcal: 0,
  });

  const [toggle, setToggle] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [editMealID, setEditMealID]=useState<string>('')
  const [toggleEdit, setToggleEdit]=useState(false)

  useEffect(() => {
    if (editMealID !== ''){
      const fetchSingleMeal = async ()=>{
        await axiosApi.get(`meal/${editMealID}.json`).then((response)=>{
          const kcalParse = parseFloat(response.data.kcal);
          setMeal((prevState)=>({...prevState, time: response.data.time, description: response.data.description, kcal: kcalParse}))
        })
      }
      void fetchSingleMeal()
    }
  }, [editMealID]);


  useEffect(() => {
    setToggleEdit(prevState => !prevState)
    setIsLoading((prevState) => ({ ...prevState, loadMeals: true }));
    const loadMeals = async () => {
      await axiosApi
        .get('meal.json')
        .then((response) => {
          if (response.data !== null) {
            const newMeals: IMealsItem[] = Object.keys(response.data).map(
              (id) => {
                const kcalParse = parseFloat(response.data[id].kcal);
                return { id, ...response.data[id], kcal: kcalParse };
              },
            );
            const calories = newMeals.map((meal) => meal.kcal);
            const sum = calories.reduce((sum, item) => sum + (item || 0), 0);
            setTotal(sum);
            setMeals(newMeals);
            setIsLoading((prevState) => ({ ...prevState, loadMeals: false }));
          }
        })
        .catch((error) => {
          console.log('Caught on try - load meals - ' + error);
          setIsLoading((prevState) => ({ ...prevState, loadMeals: false }));
        })
        .finally(() => {
          setIsLoading((prevState) => ({ ...prevState, loadMeals: false }));
        });
    };
    void loadMeals();
  }, [toggle]);

  const mealChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMeal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const selectChanged = (selected: IOptions | null) => {
    if (selected?.value) {
      setMeal((prevState) => ({ ...prevState, time: selected.value }));
    }
  };

  const addMeal = async () => {
    setIsLoading((prevState) => ({ ...prevState, addMeal: true }));
    try {
      await axiosApi.post('meal.json', meal);
      setIsLoading((prevState) => ({ ...prevState, addMeal: false }));
      setToggle((prevState) => !prevState);
    } catch (error) {
      console.log('Caught on try - add meal - ' + error);
      setIsLoading((prevState) => ({ ...prevState, addMeal: false }));
    }
  };

  const deleteMeal = async (key: string) => {
    const id = `meal/${key}.json`;
    try {
      await axiosApi.delete(id);
      setToggle((prevState) => !prevState);
    } catch (error) {
      console.log('Caught on try - delete meal - ' + error);
    }
  };

  const editMeal= (key:string)=>{
setEditMealID(key)
    setToggleEdit(prevState => !prevState)
    navigate('meals/new')
  }

  return (
    <>
      <header className="bg-neutral-50 border-b">
        <div className="container mx-auto py-3">
          <span className="text-3xl font-bold text-green-900">
            Calories Tracker
          </span>
        </div>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Meals
                meals={meals}
                isMealsLoading={isLoading}
                total={total}
                onDelete={deleteMeal}
                onEdit={editMeal}
              />
            }
          />
          <Route
            path="meals/new"
            element={
              <MealTool
                onSubmit={addMeal}
                onChange={mealChanged}
                onSelect={selectChanged}
                meal={meal}
                isEdit={toggleEdit}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
