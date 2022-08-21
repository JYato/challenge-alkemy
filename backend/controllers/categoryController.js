import { Category, Transaction } from "../models/index.js";


const getCategories = async (req, res) => {
    const {id: userId} = req.user;
    const categories = await Category.scope('withOutFields').findAll({where:{userId}});
    if(categories.length === 0) {
        const error = new Error("This user has not created categories");
        return res.status(400).json({ msg: error.message });
    }
    return res.status(200).json({
        categories
    })
}

const addCategory = async (req, res) => {
    const {name} = req.body;
    const {id: userId} = req.user;

    //Check if category exists
    const cat = await Category.findOne({where: {name, userId}});
    if(cat){
        const error = new Error("Category already exists");
        return res.status(400).json({ msg: error.message });
    }

    try {
        //Save new category
        const category = await Category.create({
            name,
            userId
        });

        res.status(200).json({
            id: category.id,
            name: category.name,
            userId: category.userId
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteCategory = async (req, res) => {
    const {id: idCategory} = req.params;
    const {id: userId} = req.user;

    const categoryDelete = await Category.findOne({where:{id: idCategory}});
    if(!categoryDelete){
        const error = new Error("Category does not exist");
        return res.status(400).json({msg: error.message});
    }
    if(categoryDelete.userId.toString() !== userId.toString()) {
        const error = new Error("Invalid user");
        return res.status(403).json({msg: error.message});
    }
    //check if exists dependent transactions
    const dependentTransaction = await Transaction.findOne({where: {categoryId: idCategory}});
    if(dependentTransaction){
        const error = new Error("There are dependent transactions, please first edit or delete respective transactions");
        return res.status(403).json({msg: error.message});
    }

    try {
        await categoryDelete.destroy();
        res.status(200).json({msg: "Category was removed"});

    } catch (error) {
        console.log(error);
    }


}

export {
    getCategories,
    addCategory,
    deleteCategory
}