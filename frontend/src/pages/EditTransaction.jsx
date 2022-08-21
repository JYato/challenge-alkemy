import React, { useEffect, useState } from 'react'
import useTransaction from '../hooks/useTransaction';
import { useNavigate } from 'react-router-dom';

const EditTransaction = () => {

    const {transactionEdit, setTransactionEdit, categories, updateTransaction, setLoadingTr} = useTransaction();

    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoadingTr(true);
        updateTransaction(transactionEdit.id, {
            concept: transactionEdit.concept,
            amount: Number(transactionEdit.amount),
            date: transactionEdit.date,
            type : transactionEdit.type,
            categoryId: transactionEdit.categoryId
        })
        setTransactionEdit({});
        setLoadingTr(false);
        navigate("/home");
    }

    const handleCategory = (value) => {
        setTransactionEdit({
            ...transactionEdit,
            categoryId: categories[value].id,
            category: {
                name: categories[value].name
            }
        })
    }

  return (
    <div className="form-control w-full max-w-xs m-auto pt-12">
        <h3 className='font-bold self-center mb-4'>Edit Transaction</h3>              
        <label className="label">
            <span className="label-text">Concept</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5"
            name='concept'
            value={transactionEdit.concept}
            onChange={(e) => setTransactionEdit({
                ...transactionEdit,
                [e.target.name]: e.target.value
            })}/>

        <label className="label">
            <span className="label-text">Amount</span>
        </label>
        <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5"
            name='amount'
            value={transactionEdit.amount}
            onChange={(e) => setTransactionEdit({
                ...transactionEdit,
                [e.target.name]: e.target.value
            })}/>
        
        <label className="label">
            <span className="label-text">Date</span>
        </label>
        <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5"
            name='date'
            value={transactionEdit.date}
            onChange={(e) => setTransactionEdit({
                ...transactionEdit,
                [e.target.name]: e.target.value
            })}/>
        
        <label className="label">
            <span className="label-text">Type</span>
        </label>
        <select value={transactionEdit.type} className="select select-bordered" disabled>
            <option value={transactionEdit.type}>{transactionEdit ? 'Income' : 'Expense'}</option>       
        </select>
        
        <label className="label">
            <span className="label-text">Category</span>
        </label>
        <select
            value={transactionEdit.categoryId} 
            name='categoryId' 
            className="select select-bordered" 
            onChange={(e) => handleCategory(e.target.value)}
        >
            <option value={transactionEdit.categoryId}>{transactionEdit.category.name}</option>
            {categories?.map((category, i) => {
                return(<option key={category.id} value={i}>{category.name}</option>)
            })}
            
        </select>
        <button 
            className='btn mt-4'
            onClick={() => handleSubmit()}
        >
            Save Changes
        </button>
    </div>
  )
}

export default EditTransaction