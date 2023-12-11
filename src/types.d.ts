import React from "react";

export interface ITotal {
  total: number
}

export interface IMeals {
  meals: IMealsItem[]
  isMealsLoading: IisLoading
  total: number
  onDelete: (key: string)=>void
  onEdit: (key: string)=>void
}
export interface IMealsItem {
  id?: string
  time: string
  description: string,
  kcal: number
  onDelete?: (key:string)=>void
  onEdit?: (key: string)=>void
}

export interface IOptions {
  value: string,
  label: string
}

export interface IMealTool {
  onSubmit: ()=>void
  onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void
  onSelect: (selected: IOptions | null)=>void
  meal?: MealItem
  isEdit?: boolean

}

export interface IisLoading {
  loadMeals: boolean
}

export type MealItem = Omit<IMealsItem, 'id'>
