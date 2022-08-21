import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useTransaction from "../hooks/useTransaction"

const ModalTransaction = () => {
    const {categories, addTransaction} = useTransaction();
    
    const [concept, setConcept] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [type, setType] = useState(false);
    const [category, setCategory] = useState(0);

    const {handleSetAlert} = useAuth();

    const handleAdd = () => {
        if([concept, date].includes('') && amount <= 0 && category == 0){
            handleSetAlert({
                msg: "All fields are required",
                error: true
            })
            return;
        }
        addTransaction({
            concept,
            amount: Number(amount),
            date,
            type,
            categoryId: category
        })
        setConcept('');
        setAmount(0);
        setDate('');
        setType(0);
        setCategory(0);        
    }
  return (
    <>
        <label htmlFor="my-modal2" className="btn modal-button w-32 justify-self-start self-start">Add Transaction</label>
        <input type="checkbox" id="my-modal2" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box relative">
                <label htmlFor="my-modal2" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                               
                <div className="form-control w-full max-w-xs">
                    <h3>Add new Transaction</h3>
                    
                    <label className="label">
                        <span className="label-text">Concept</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5"
                        value={concept}
                        onChange={(e) => setConcept(e.target.value)}/>

                    <label className="label">
                        <span className="label-text">Amount</span>
                    </label>
                    <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}/>
                    
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}/>
                    
                    <label className="label">
                        <span className="label-text">Type</span>
                    </label>
                    <select value={type} className="select select-bordered" onChange={e=> setType(e.target.value)}>
                        <option value={0}>Expense</option>
                        <option value={1}>Income</option>
                    </select>
                    
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select value={category} className="select select-bordered" onChange={e=> setCategory(e.target.value)}>
                        <option>Select a category</option>
                        {categories.map((category) => {
                            return(<option key={category.id} value={category.id}>{category.name}</option>)
                        })}
                    </select>
                    
                    <button 
                        className="modal-action btn self-end text-center" 
                        htmlFor="my-modal2"
                        onClick={()=>handleAdd()}
                    >Save</button>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default ModalTransaction