import {useState} from "react";
import {IMealsItem} from "../../types";
import {Route, Routes} from "react-router-dom";
import Meals from "../../components/Meals/Meals.tsx";
import MealTool from "../../components/MealTool/MealTool.tsx";

function App() {

  const [meals, setMeals]=useState<IMealsItem[]>([])

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
          <Route path="meals/new" element={<MealTool/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
