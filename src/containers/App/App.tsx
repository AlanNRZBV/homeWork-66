import React, {useCallback, useEffect, useState} from "react";
import {IisLoading, IMealsItem, IOptions, MealItem} from "../../types";
import {Route, Routes} from "react-router-dom";
import Meals from "../../components/Meals/Meals.tsx";
import MealTool from "../../components/MealTool/MealTool.tsx";
import axiosApi from "../../axiosApi.ts";

function App() {

  const [meals, setMeals]=useState<IMealsItem[]>([])
  const [isLoading, setIsLoading]=useState<IisLoading>({
    loadMeals: false,
    addMeal: false
  })
  const [meal, setMeal]=useState<MealItem>({
    time: '',
    description: '',
    kcal: null
  })

  const countTotal = ()=>{
    
  }

  useEffect(() => {
    const loadMeals = async ()=>{
      setIsLoading(prevState => ({...prevState,loadMeals: true}))
      await axiosApi.get('meal.json').then((response)=>{
          if (response.data !== null){
            const newMeals = Object.keys(response.data).map((id)=>({id,...response.data[id]}))
            setMeals(newMeals)
            setIsLoading(prevState => ({...prevState,loadMeals: false}))
          }
      }).catch((error)=>{
        console.log('Caught on try - load meals - ' + error)
        setIsLoading(prevState => ({...prevState,loadMeals: false}))
      })
    }
    void loadMeals()
  }, []);

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
      await axiosApi.post('meal.json', meal)
      setIsLoading(prevState => ({...prevState, addMeal: false}))
    }catch (error){
      console.log('Caught on try - add meal - ' + error)
      setIsLoading(prevState => ({...prevState, addMeal: false}))
    }
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
          <Route path="/" element={<Meals meals={meals} isMealsLoading={isLoading}/>}/>
          <Route path="meals/new" element={<MealTool onSubmit={addMeal} onChange={mealChanged} onSelect={selectChanged}/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
