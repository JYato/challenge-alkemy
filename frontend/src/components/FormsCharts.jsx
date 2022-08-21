import Balance from "./Balance"
import ModalAddCategory from "./ModalAddCategory"
import AddButton from '../assets/add.svg'

import useTransaction from "../hooks/useTransaction"
import { useState } from "react"
import ModalDeleteCategory from "./ModalDeleteCategory"

const FormsCharts = () => {
    const {categories, selectedCategory, setSelectedCategory} = useTransaction();

  return (
    <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
        <Balance/>
        <div className="form-control gap-5">
                        
            <div className="input-group flex flex-col gap-3">
                {categories.length ? (
                    <select value={selectedCategory} className="select select-bordered" onChange={e=> setSelectedCategory(e.target.value)}>
                        <option value={0}>Filter by category</option>
                        {categories?.map((category) => {
                            return(<option key={category.id} value={category.id}>{category.name}</option>)
                        })}
                    </select>
                ) : (
                    <select value={selectedCategory} className="select select-bordered" onChange={e=> setSelectedCategory(e.target.value)}>
                        <option value={0}>Filter by category</option>
                    </select>
                )}
                
                <ModalAddCategory/>
                <ModalDeleteCategory/>

            </div>
                
        </div>
    </div>
  )
}

export default FormsCharts