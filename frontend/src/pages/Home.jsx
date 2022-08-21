import FormsCharts from "../components/FormsCharts"
import Transactions from "../components/Transactions"

const Home = () => {
  return (
    <div className="flex flex-col gap-7">
        <FormsCharts/>
        <Transactions/>
    </div>
  )
}

export default Home