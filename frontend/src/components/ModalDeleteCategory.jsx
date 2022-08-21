import { useState } from "react";
import useTransaction from "../hooks/useTransaction"

const ModalDeleteCategory = () => {
    const {categories, deleteCategory} = useTransaction();
    const [selectedDeleteCategory, setSelectedDeleteCategory] = useState(0);
    const handleDeleteCategory = () => {
        if(selectedDeleteCategory == 0) return;
        deleteCategory(selectedDeleteCategory);
        setSelectedDeleteCategory(0);
    }
  return (
    <>
        <label htmlFor="my-modal-3" className="btn modal-button">Delete Category</label>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box relative">
                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <div className="input-group">
                <select value={selectedDeleteCategory} className="select select-bordered" onChange={e=> setSelectedDeleteCategory(e.target.value)}>
                    <option value={0}>Pick a category to delete</option>
                    {categories.map((category) => {
                        return(<option key={category.id} value={category.id}>{category.name}</option>)
                    })}
                </select>
            </div>
                <div className="modal-action" onClick={()=>handleDeleteCategory()}>
                    <label htmlFor="my-modal-3" className="btn">Delete</label>
                </div>
            </div>
        </div>
    </>
  )
}

export default ModalDeleteCategory