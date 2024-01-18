import { useState, useEffect } from "react"
import { CheeseService, SauceService, SizeService, ToppingService } from "../../services/optionService"
import { createOrder, createPizza } from "../../services/orderService"


export const NewOrder = ({currentUser}) => {
    const [allchecked, setAllChecked] = useState([])
    const [size, setSize] = useState(0)
    const [cheese, setCheese] = useState(0)
    const [sauce, setSauce] = useState(0)
    const [delivery, setDelivery] = useState(false)
    const [dineIn, setDineIn] = useState(false)
    const [address, setAddress] = useState("")
    const [table, setTable] = useState("")
    const [total, setTotal] =useState(0)

    const [allCheeses, setAllCheeses] = useState([])
    const [allSauces, setAllSauces] = useState([])
    const [allSizes, setAllSizes] = useState([])
    const [allToppings, setAllToppings] = useState([])

    const [pizzaObject, setPizzaObject] = useState({})
    const [orderPizzas, setOrderPizzas] = useState([])
    
  

    const submitOrder = () => {

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; 
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();

        const order = {
            
                "date": `${year}-${month}-${day}`,
                "time": `${hours}:${minutes}`,
                "employeeId": currentUser.id,
                "delivererId": null,
                "completed": false
        }
        if (delivery === true) {
            order.address = address 
        } else {
            order.table = table
        }
        createOrder(order)
    }

    const handlePizza = (pizzaObject) => {
        setOrderPizzas(oldArray => [...oldArray, pizzaObject])
        console.log(pizzaObject)
        createPizza(pizzaObject)
    }

    const handleChecked = (event) => {
        let isChecked = event.target.checked
        let value = parseInt(event.target.value)

        if (isChecked) {
            setAllChecked([...allchecked, value])
        } else {
            setAllChecked((currentChecked) => {
                return currentChecked.filter((id)=>{
                    return id !== value
                })
            })
        }   
    }

    const handleSizeOption = (event) => {
        setSize(parseInt(event.target.value))
    }
    
    const handleSauceOption = (event) => {
        setSauce(parseInt(event.target.value))
    }

    const handleCheeseOption = (event) => {
        setCheese(parseInt(event.target.value))
    }

    const handleAddress = (event) => {
        setAddress(event.target.value)
    }

    const handleTable = (event) => {
        setTable(event.target.value)
    }
    useEffect(() => {
       
        let pizza = { 
            "sizeId": size,
            "cheeseId": cheese,
            "sauceId": sauce,
            "toppingsArray": allchecked

        }
        setPizzaObject(pizza)
    }, [size, cheese, sauce, allchecked])

    useEffect((orderPizzas) => {
        let orderTotal = 0
        for (let pizza of orderPizzas) {
            if (pizza.size === 3) {
                orderTotal += 15
            } else if (pizza.size === 2) {
                orderTotal += 12
            } else if (pizza.size === 1) {
                orderTotal += 10
            }
        }
        setTotal(orderTotal)

    }, [orderPizzas])

    useEffect(() => {
        CheeseService().then((cheeses) =>
        setAllCheeses(cheeses))
    }, [])

    useEffect(() => {
        SauceService().then((sauces) =>
        setAllSauces(sauces))
    }, [])

    useEffect(() => {
        SizeService().then((sizes) => 
        setAllSizes(sizes))
    }, [])

    useEffect(() => {
        ToppingService().then((toppings) => 
        setAllToppings(toppings))
    }, [])

    return (
        <div> 
        <h1>New Order</h1>
          <div>
           <section className="options">
            <ul className="sizes">
                {allSizes.map(
                    (size) => {
                        return (
                            <section className="option">
                            <input type='radio' value={size.id}  name="sizeoption" onClick={handleSizeOption} />
                            {size.size} - ${size.price}
                            </section>
                        )
                    }
                )}
            </ul>
            <ul className="cheeses">
                {allCheeses.map(
                    (cheese) => {
                        return (
                            <section className="option">
                            <input type='radio' name="cheeseoption" value={cheese.id} onClick={handleCheeseOption} /> 
                            {cheese.cheese} 
                            </section>
                        )
                    }
                )}
            </ul>
            <ul className="sauces">
                {allSauces.map(
                    (sauce) => {
                        return (
                            <section className="option">
                            <input type='radio' name="sauceoption" value={sauce.id} onClick={handleSauceOption} /> 
                            {sauce.sauce} 
                            </section>
                        )
                    }
                )}
            </ul>
            <form className="toppings">
                {allToppings.map(
                    (topping) => {
                        return (
                            <div>
                                <input
                                   type="checkbox"
                                   label={topping.topping}
                                   id={topping.id}
                                   value={topping.id}
                                   checked={allchecked.includes(topping.id)}
                                   onChange={handleChecked}
                                />{topping.topping}
                               
                            </div>  
                        )
                    }
                )}
            </form>
            <button onClick={() => handlePizza(pizzaObject)}>ADD PIZZA</button>
           </section>
           <section className="order">
             <h1>Order</h1>
                <ul>
                {orderPizzas.map(
                    (pizza, i) => {
                        return (
                            <div>Pizza #{i + 1} <button>Edit</button><button>Delete</button></div>
                    )}                 
                )}
                </ul> 
                <div>
                    <div>
                    <input
                            type="checkbox"
                            label="Delivery"
                            onChange={() => setDelivery(!delivery)}
                            />Delivery
                    </div>
                    {delivery ? 
                    
                            <form>
                                <input type="test" placeholder="Address" 
                                onChange={(event) => handleAddress(event)} />
                            </form>
                        : "" }
                     <div>
                    <input
                            type="checkbox"
                            label="DineIn"
                            onChange={() => setDineIn(!dineIn)}
                            />Dine In
                    </div>
                    {dineIn ? 
                    
                            <form>
                                <input type="number" placeholder="Table" 
                                onChange={(event) => handleTable(event)} />
                            </form>
                        : "" }
                </div>
                <div>
                    <button onClick={() =>submitOrder()}>Submit order</button>
                    <p>Total : ${total}</p>
                </div>     
           </section>
         </div>
        </div>
    )
}