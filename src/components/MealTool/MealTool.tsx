import {IMealTool, IOptions} from "../../types";
import Select from "react-select";
import React, {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const MealTool: FC<IMealTool> = ({onChange, onSelect, onSubmit,meal,isEdit}) => {

  const navigate = useNavigate()
  const options: IOptions[] = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'snack', label: 'Snack' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
  ];
  

  const submitHandler = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    onSubmit()
    navigate('/')
  }

  return (
    <div className="container mx-auto mt-5">
      <form onSubmit={submitHandler}>
        <Select
            onChange={onSelect}
            options={options}
            isSearchable={true}
            required
        />
        <div className="flex flex-col">
          <label htmlFor="description">Meal description</label>
          <input
              onChange={onChange}
              className="rounded border-2 px-2 py-0.5"
              type="text"
              name="description"
              id="description"
              value={meal?.description}
              required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Calories</label>
          <input
              onChange={onChange}
              className="rounded border-2 px-2 py-0.5"
              type="text"
              name="kcal"
              value={meal?.kcal}
              id="kcal"
              required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default MealTool;