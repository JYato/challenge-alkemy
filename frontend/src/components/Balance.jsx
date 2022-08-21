import { useEffect, useState } from "react";
import DonutChart from "react-donut-chart"
import useTransaction from "../hooks/useTransaction"

const Balance = () => {
    const {transactionsToShow} = useTransaction();

    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const calcIncOut = () => {
            let tempIncome = 0, tempExpense = 0;
            transactionsToShow?.forEach((transaction) => {
                if(transaction.type === false) tempExpense += transaction.amount;
                else{tempIncome += transaction.amount}
            })
            setIncome(tempIncome);
            setExpense(tempExpense);
        }
        calcIncOut();
    }, [transactionsToShow]);

    // const handleResize = () => {
    //     setScreenWidth(window.innerWidth);
    // }

    // useEffect(() => {
    //     window.addEventListener("resize", handleResize, false);
    // }, []);
    
  return (
    <DonutChart
        className="mt-6 p-6 md:p-6"
        //height={screenWidth > 640 ? 250: 170} // 250 150
        //width={screenWidth > 640 ? 375 : 255}  // 375 225
        height={250}
        width={375}
        data={[
            {
                label: expense === 0 ? 'No Data' : 'Expense',
                value: expense === 0 ? '' : expense,
                isEmpty: expense === 0 ? true : false
            },
            {
                label: income === 0 ? 'No Data' :'Income',
                value: income === 0 ? '' : income,
                isEmpty: income === 0 ? true : false
            },
            {
                label: `Total - ${income+expense}`,
                value: '',
                isEmpty: true
            }
        ]}
        colors={['#36BFB1', '#014034']}
    />
  )
}

export default Balance