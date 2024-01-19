import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAllOrders } from "../../services/orderService.js"
import { getAllPizzas } from "../../services/orderService.js"
import "./sales.css"


//display orders done during that month
//display fav pizzas during that month
//display total sales during that month

export const SalesReport = () => {
    const [ orders, setOrders] =useState([])
    const [pizzas, setPizzas] = useState([])
    const [userSelectedMonth, setUserSelectedMonth] = useState(0)
    const [filteredOrders, setFilteredOrders] =useState([])
    const [totalSales, setTotalSales]=useState()
    const [orderPizzas, setOrderPizzas] = useState([])

    useEffect(() => {
        getAllOrders().then((ordersArr) => {
        setOrders(ordersArr);
        });
        getAllPizzas().then((pizzaArr)=>{
            setPizzas(pizzaArr)
        })
      }, []);



const handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value)
    setUserSelectedMonth(selectedMonth)
}

useEffect(()=>{
    const showFilteredOrders = () => {
        const filteredOrders= orders.filter((order)=>{
            const orderMonth= new Date(order.date).getUTCMonth() + 1
            return orderMonth===userSelectedMonth
        })
        setFilteredOrders(filteredOrders)
    }
    showFilteredOrders()
},[orders, userSelectedMonth])

useEffect(()=>{
    const showTotalSales = () => {
        const totalSales = pizzas.filter((pizza)=>{
            const pizzaMonth = new Date(pizza.order.date).getUTCMonth() + 1
            return pizzaMonth = userSelectedMonth

        })
        let toppingPrice = 0
        for (const pizzas of orders) {
            toppingPrice += pizzas.pizzaToppings?.length * .50
        }
        let sizePrice = 0
        for (const pizzaObj of orders){
            if (pizzaObj.sizeId === 3) {
                sizePrice += 15
            } else if (pizzaObj.sizeId === 2) {
                sizePrice += 12
            } else if (pizzaObj.sizeId === 1) {
                sizePrice += 10
            }
        }
        let deliveryPrice = 0
        for (const pizzaObj of orders){
            if (pizzaObj.delivererId != 0){
                deliveryPrice = 5
            }
        }
        setTotalSales(toppingPrice+sizePrice+deliveryPrice)
    }
    showTotalSales(totalSales)
},[userSelectedMonth,pizzas])


    return (
        <>
        <h2>Sales Report</h2>
        <button className="Home">
                    <Link to="/" className="nav-link">
                       <img src="https://i.pinimg.com/originals/b0/22/07/b0220700bcfee516dfd95bf09507cd80.png" />
                    </Link>
                </button>
        <div>
            <select className="monthly-dropdown" value={userSelectedMonth} onChange={handleMonthChange}>
                <option value="">Sales Month...</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
        </div>
        <div className="main-body">
        <div className="monthlySales">
            <h2>Monthly Sales for {userSelectedMonth}</h2>
            <div className="orders">{filteredOrders.map((order)=>(
                <div key={order}><div>{order.id}</div><div>{order.pizzaId}</div></div>
                
            ))}<div></div></div>
        </div>
        <div className="popularTopping">
            <h2>Most Popular Topping of the Month</h2>
            <div>{}</div>
        </div>
        <div className="totalSales">
                <h2>Total Sales for {userSelectedMonth}</h2>
                <div>${totalSales}</div>
        </div>
        </div>
        
        </>
    )
}