export interface ITotal {
  total: number
}

export interface IMeals {
  meals: IMealsItem[]
}
export interface IMealsItem {
  id?: string
  time: "Breakfast" | "Snack" | "Lunch" | "Dinner" | "Supper"
  description: string,
  kcal: number
}
