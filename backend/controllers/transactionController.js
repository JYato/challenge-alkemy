import { Transaction, Category } from "../models/index.js";


const getTransactions = async (req, res) => {
    const {id: userId} = req.user;
    const transactions = await Transaction.scope('withOutFields').findAll({where:{userId}, include: [{ model: Category, required: false, attributes: ['name']}]});
    if(transactions.length === 0) {
        // const error = new Error("This user has not created transactions");
        // return res.status(400).json({ msg: error.message });
        return res.json([]);
    }
    return res.status(200).json({
        transactions
    })
}

const addTransaction = async (req, res) => {
    const {concept, amount, date, type, categoryId} = req.body;
    const {id: userId} = req.user;

    //Check if transaction exists
    const transaction = await Transaction.findOne({where: {concept, userId}});
    if(transaction){
        const error = new Error("Transaction already exists");
        return res.status(400).json({ msg: error.message });
    }
    //check if category belongs to user and if this user can add some transaction
    const categoryBelongs = await Category.findOne({where: {id:categoryId}})
    if(categoryBelongs.userId.toString() !== userId.toString()){
        const error = new Error("Invalid action");
        return res.status(403).json({msg: error.message});
    }

    try {
        //Save new transaction
        const newTransaction = await Transaction.create({
            concept,
            amount,
            date,
            type,
            categoryId,
            userId
        });

        const cat = await Category.findOne({where:{id:categoryId}, attributes: ['name']});

        res.status(200).json({
            date: newTransaction.date,
            id: newTransaction.id,
            concept: newTransaction.concept,
            amount: newTransaction.amount,            
            type: newTransaction.type,
            userId: newTransaction.userId,
            categoryId: newTransaction.categoryId,
            category: {
                name: cat.name
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const updateTransaction = async (req, res) => {
    const {id} = req.params;
    const {id: userId} = req.user;
    const {concept, amount, date, type, categoryId} = req.body;

    const transaction = await Transaction.scope('withOutFields').findByPk(id, {include: [{ model: Category, required: false, attributes: ['name']}]}); 

    if(!transaction) {
        return res.status(400).json({ msg: "Transaction does not exist"});
    }

    if(transaction.userId.toString() !== userId.toString()) {
        return res.status(403).json( {msg: "Invalid action"});
    }
    
    //Update transaction
    transaction.concept = concept || transaction.concept;
    transaction.amount = amount || transaction.amount;
    transaction.date = date || transaction.date;
    transaction.type = type || transaction.type;
    transaction.categoryId = categoryId || transaction.categoryId;
    const cat = await Category.findOne({where:{id:transaction.categoryId}, attributes: ['name']});
    transaction.category.name = cat.name;

    try {
        const updatedTransaction = await transaction.save();
        res.status(200).json(updatedTransaction);
    } catch (error) {
        console.log(error)        ;
    }


}

const deleteTransaction = async (req, res) => {
    const {id} = req.params;
    const {id: userId} = req.user;

    const transactionDelete = await Transaction.findByPk(id);
    if(!transactionDelete) {
        const error = new Error("Transaction does not exist");
        return res.status(404).json({msg:error.message});
    }
    if(transactionDelete.userId.toString() !== userId.toString()){
        const error = Error("Invalid action");
        return res.status(403).json({msg: error.message});
    }
    try {
        await transactionDelete.destroy();
        res.status(200).json({msg: "Transaction was removed"});
    } catch (error) {
        console.log(error);
    }

}
export {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
}