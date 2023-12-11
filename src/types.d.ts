import React from "react";

export interface ITotal {
  total: number
}

export interface IMeals {
  meals: IMealsItem[]
  isMealsLoading: IisLoading
}
export interface IMealsItem {
  id?: string
  time: string
  description: string,
  kcal: number | null
}

export interface IOptions {
  value: string,
  label: string
}

export interface IMealTool {
  onSubmit: ()=>void
  onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void
  onSelect: (selected: IOptions | null)=>void
}

export interface IisLoading {
  loadMeals: boolean
  addMeal: boolean
}

export type MealItem = Omit<IMealsItem, 'id'>
