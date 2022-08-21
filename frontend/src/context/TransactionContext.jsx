import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";

const TransactionContext = createContext();
const TransactionProvider = ({children}) => {

    const [transactions, setTransactions] = useState([]);//total
    const [transactionEdit, setTransactionEdit] = useState({});//edit
    const [transactionsToShow, setTransactionsToShow] = useState([]);//filter

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    
    const [loadingTr, setLoadingTr] = useState(true);

    const {auth, handleSetAlert, clean} = useAuth();

    useEffect(()=> {
        const cleanStates = () => {
            if(clean == true){
                setTransactions([]);
                setTransactionEdit({});
                setTransactions([]);
                setCategories([]);
                setSelectedCategory(0);
            }
        }
        cleanStates();
    }, [clean]);

    useEffect(() => {
        const getCategoriesAndTransactions = async () => {
            const token = localStorage.getItem('token');
            if(!token) {
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                //Promise All
                const { data: dataT } = await axiosClient.get('/transaction', config);                
                const {transactions} = dataT;
                setTransactions(transactions);

                const {data: dataC} = await axiosClient.get('/category', config);
                const {categories} = dataC;
                setCategories(categories);

                setLoadingTr(false);
            } catch (error) {
                console.log(error);
                setLoadingTr(false);
            }
        }

        getCategoriesAndTransactions();
    }, [auth])

    const addCategory = async (category) => {
        const token = localStorage.getItem('token')
        if(!token)return;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await axiosClient.post('category', category, config);
            const { ...newCategory} = data;
            setCategories([newCategory, ...categories]);
            handleSetAlert({
                msg: "Category added successfully",
                error: false
            })
        } catch (error) {
            console.log(error.response.data.msg);
            handleSetAlert({
                msg: error.response.data.msg,
                error:true
            })
        }
    }

    const deleteCategory = async (id) => {
        const confirmDelete = confirm('Do you want to delete this category');
        if(confirmDelete){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                
                const {data} = await axiosClient.delete(`/category/${id}`, config);
                const updatedCategories = categories.filter( current => current.id != id);
                setCategories([...updatedCategories]);
                handleSetAlert({
                    msg: data.msg,
                    error: false
                })
                
            } catch (error) {
                console.log(error);
                handleSetAlert({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
    }

    const addTransaction = async (transaction) => {
        const token = localStorage.getItem('token');
        if(!token)return;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await axiosClient.post('transaction', transaction, config);
            const { ...newTransaction} = data;
            const arr = transactions;
            arr.push(newTransaction);
            setTransactions([...arr]);
            handleSetAlert({
                msg: "Transaction added succesfully",
                error: false
            })
        } catch (error) {
            console.log(error.response.data.msg);
            handleSetAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const updateTransaction = async (id, transaction) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await axiosClient.put(`/transaction/${id}`, transaction, config);
            const updatedTransactions = transactions.map( current => {
                if(current.id == data.id){
                    return data;
                }
                return current;
            });
            setTransactions([...updatedTransactions]);
            handleSetAlert({
                msg: "Transaction updated successfully",
                error: false
            })
        } catch (error) {
            console.log(error);
            handleSetAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const setEditionTransaction = (transaction) => {
        setTransactionEdit(transaction);
    }

    const deleteTransaction = async(id) => {
        const confirmDelete = confirm('Do you want to delete this transaction');
        if(confirmDelete){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                
                await axiosClient.delete(`/transaction/${id}`, config);
                const updatedTransactions = transactions.filter( current => current.id != id);
                setTransactions([...updatedTransactions]);
                handleSetAlert({
                    msg: "Transaction deleted successfully",
                    error: false
                })                
            } catch (error) {
                console.log(error);
                handleSetAlert({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
    }
        

    return(
        <TransactionContext.Provider
            value={{
                addCategory,
                deleteCategory,
                addTransaction,
                updateTransaction,
                deleteTransaction,
                setEditionTransaction,
                setTransactionEdit,
                transactions,
                transactionEdit,
                categories,
                selectedCategory,
                setSelectedCategory,
                transactionsToShow,
                setTransactionsToShow,
                loadingTr,
                setLoadingTr  
            }}
        >
            {children}
        </TransactionContext.Provider>
    )

}

export {
    TransactionProvider
}

export default TransactionContext;