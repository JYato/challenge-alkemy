import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTransaction from "../hooks/useTransaction"
import ModalTransaction from "./ModalTransaction";
import Alert from "./Alert";

const Transactions = () => {

    const {transactions, selectedCategory, transactionsToShow, setTransactionsToShow, setEditionTransaction, deleteTransaction} = useTransaction();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, settotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      const stt = () => {
        const total = Math.ceil(transactionsToShow.length/10);
        settotalPages(total);
      }
      stt();
    }, [transactionsToShow]);
    
    
    useEffect(() => {
      const getTransactionsToShow = async () => {
        if(transactions){
            if(selectedCategory == 0) {
                let arr = [...transactions];
                arr = arr.sort((a,b)=> new Date(b.date) - new Date(a.date));
                setTransactionsToShow([...arr]);
            }else{
                let filtered = transactions.filter((tr) => tr.categoryId == selectedCategory);
                filtered = filtered.sort((a,b)=> new Date(b.date) - new Date(a.date));
                setTransactionsToShow([...filtered]);
            }
        }else{
            setTransactionsToShow([]);
        }
        
      }
      getTransactionsToShow();
    }, [selectedCategory, transactions]);


    const handleEdit = (transaction) => {
        setEditionTransaction(transaction);
        navigate('/home/transaction');
    }

    const handleDelete = (id) => {
        deleteTransaction(id);
    }
    
    const renderButtonsPagination = () => {
        let buttons = [];
        for(let i = 1; i <= totalPages; i++){
            buttons.push(<button className="btn btn-outline" value={i} key={i} onClick={()=> setCurrentPage(i)}>{i}</button>)
        }
        return buttons;
    }
    
  return (
    <div className="flex flex-col gap-7 w-full lg:w-[60rem] xl:w-[75rem] items-center mx-4 lg:mx-auto">
        <div className="flex w-full lg:w-[60rem] xl:w-[75rem] gap-6">
            <ModalTransaction/>
            <Alert/>
        </div>
        
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Concept</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Options</th>
                    </tr>
                </thead>                
                <tbody>
                    {transactionsToShow?.slice((currentPage-1)*10, currentPage == totalPages ? transactionsToShow.length :currentPage*10).map((transaction, i) => {
                        return(
                            <tr key={transaction.id}>
                                <th>{i+1+((currentPage-1)*10)}</th>
                                <td>{transaction.concept}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.type === false ? 'expense': 'income'}</td>
                                <td>{transaction.category.name}</td>
                                <td className="flex flex-col gap-2">
                                    <button 
                                        className="btn btn-outline btn-info w-12 text-xs min-h-0 h-8"
                                        onClick={()=> handleEdit(transaction)}
                                    >Edit</button>
                                    <button 
                                        className="btn btn-outline btn-error w-12 text-xs min-h-0 h-8"
                                        onClick={() => handleDelete(transaction.id)}
                                    >Delete</button>
                                    
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                        
                
            </table>
        </div>
        <div className="flex gap-2 ml-2">
            {totalPages > 0 &&  renderButtonsPagination()}
        </div>
        

    </div>
  )
}

export default Transactions
