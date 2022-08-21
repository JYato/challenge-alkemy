import { useState } from "react";
import useTransaction from "../hooks/useTransaction"

const ModalAddCategory = () => {
    const {addCategory} = useTransaction();
    
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if(newCategory.trim() == '')return;
        addCategory({name: newCategory});
        setNewCategory('');
    }
  return (
    <>
        <label htmlFor="my-modal" className="btn  modal-button">Add Category</label>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box relative">
                <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <div className="input-group flex flex-col">
                    <h3>Add a New Category</h3>
                    <label className="label mt-5">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs mb-5"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}/>
                </div>
                <div className="modal-action" onClick={()=>handleAddCategory()}>
                    <label htmlFor="my-modal" className="btn">Add</label>
                </div>
            </div>
        </div>
    </>
  )
}

export default ModalAddCategory