import React, {useCallback, useState} from "react";
import {IMealsItem, IOptions, MealItem} from "../../types";
import {Route, Routes} from "react-router-dom";
import Meals from "../../components/Meals/Meals.tsx";
import MealTool from "../../components/MealTool/MealTool.tsx";
import axiosApi from "../../axiosApi.ts";

function App() {

  const [meals, setMeals]=useState<IMealsItem[]>([])
  const [isLoading, setIsLoading]=useState({
    addMeal: false
  })
  const [meal, setMeal]=useState<MealItem>({
    time: '',
    description: '',
    kcal: null
  })

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

  const addMeal = async ()=>{
    setIsLoading(prevState => ({...prevState, addMeal: true}))
    try {
      await axiosApi.post('meal', meal)
      setIsLoading(prevState => ({...prevState, addMeal: false}))
    }catch (error){
      console.log('Caught on try - add meal - ' + error)
      setIsLoading(prevState => ({...prevState, addMeal: false}))
    }
  }

  const testFn = ()=>{
    console.log(meal)
  }


  return (
    <>
      <header className="bg-neutral-50 border-b">
        <div className="container mx-auto py-3">
          <span className="text-3xl font-bold text-green-900">Calories Tracker</span>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Meals meals={meals}/>}/>
          <Route path="meals/new" element={<MealTool onSubmit={addMeal} onChange={mealChanged} onSelect={selectChanged} isLoading={isLoading}/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
