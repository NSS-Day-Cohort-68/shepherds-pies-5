import { useState, useEffect } from "react"
import { CheeseService, SauceService, SizeService, ToppingService } from "../../services/optionService"
import { createOrder, createPizza, createTopping, deletePizza, deletePizzaTopping, getPizzaById, upDateOrder } from "../../services/orderService"
import { Link } from "react-router-dom"


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

    const [toppingPizza, setToppingPizza]= useState(0)
    const [pizzaObject, setPizzaObject] = useState({})
    const [orderPizzas, setOrderPizzas] = useState([])
    const [orderNumber, setOrderNumber] = useState(0)
    const [order, setOrder] = useState({})
    
  

    const handleDeliveryOrder = (order) => {
       
       
        let orderCopy = {...order}
        orderCopy.address = address
        orderCopy.total = total  
        upDateOrder(orderCopy)
            
        
    }

    const handleDineInOrder = (order) => {
        let orderCopy = {...order}
         orderCopy.table = table
         orderCopy.total = total
         upDateOrder(orderCopy)
     }

    const handlePizza = (pizzaObject) => {

        createPizza(pizzaObject).then((pizza) => setToppingPizza(pizzaObject.id))
        setPizzaObject(pizzaObject)
        setOrderPizzas(oldArray => [...oldArray, pizzaObject])
        

        setCheese('')
        setSauce('')
        setSize('')
        handleToppings(allchecked) 
        setAllChecked([])
        handlePizzaTotal(pizzaObject)
    }
    
    const handlePizzaTotal = (pizzaObject) => {
        let pizzaTotal = 0

        if (pizzaObject.sizeId === 3) {
            pizzaTotal += 15
        } else if (pizzaObject.sizeId === 2) {
            pizzaTotal += 12
        } else {
            pizzaTotal += 10
        }
        for (let topping of allchecked) {
            pizzaTotal += .5 
        }
        
        setTotal(total + pizzaTotal)
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

    const handleToppings = (allchecked) => {
        for (let topping of allchecked) {
            let pizzaTopping = {
                "pizzaId": toppingPizza,
                "toppingId": topping
            }
            createTopping(pizzaTopping)
        }
    }

    const handleDeliveryFee = () => {
        if(delivery === false) {
            setTotal(total +5)
        } else {
            setTotal(total -5)
        }
    }

    const handleDelete = (pizzaObj) => {
        // delete all associated toppings from pizzaToppings
        if(pizzaObj.id) {
        let pizzatoDelete = getPizzaById(pizzaObj.id)
        

        const pizzaToppingIds = [];
        if (pizzatoDelete.pizzaToppings?.length) {
          for (const pizzaTopping of pizzaObj.pizzaToppings) {
            pizzaToppingIds.push(pizzaTopping.id);
          }
          for (const pizzaToppingId of pizzaToppingIds) {
            deletePizzaTopping(pizzaToppingId);
          }
        }
        // delete pizza
        deletePizza(pizzatoDelete).then(() => {
          orderPizzas.filter((pizza) => pizza.id !== pizzatoDelete.id)})
        }
      };

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

    useEffect(()  => {

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
        createOrder(order).then((order) => 
        setOrder(order)
        )

    }, [currentUser])

    useEffect(() => {

        setOrderNumber(order.id)
    }, [order])

    useEffect(() => {
       
        let pizza = { 
            "sizeId": size,
            "cheeseId": cheese,
            "sauceId": sauce,
            "orderId": orderNumber
            
        }
        setPizzaObject(pizza)
    }, [size, cheese, sauce, orderNumber])

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
                            <div>Pizza #{i + 1} <button>Edit</button>
                            <button>Delete</button></div>
                    )}                 
                )}
                </ul> 
                <div>
                    <div>
                    <input
                            type="checkbox"
                            label="Delivery"
                            onChange={() => setDelivery(!delivery)}
                            onClick={() => handleDeliveryFee()}
                            />Delivery
                    </div>
                    {delivery ? 
                            <>
                            <form>
                                <input type="test" placeholder="Address" 
                                onChange={(event) => handleAddress(event)} />
                            </form>
                             <button onClick={() => handleDeliveryOrder(order)}>Submit Order</button>
                             <p>Total : ${total}</p>
                             </>
                        : "" }
                     <div>
                    <input
                            type="checkbox"
                            label="DineIn"
                            onChange={() => setDineIn(!dineIn)}
                            />Dine In
                    </div>
                    {dineIn ? 
                            <>
                            <form>
                                <input type="number" placeholder="Table" 
                                onChange={(event) => handleTable(event)} />
                            </form>
                            <button onClick={() => handleDineInOrder(order)}>Submit Order</button>
                            <p>Total : ${total}</p>
                            </>
                        : "" }
                </div>
                <div>
                    <button className="Home">
                        <Link to="/" className="nav-link">Home
                        </Link>
                    </button>
                </div>
                    
           </section>
         </div>
            
        </div>
    )
}