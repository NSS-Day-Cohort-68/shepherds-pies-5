import { useState, useEffect } from "react"
import { CheeseService, SauceService, SizeService, ToppingService } from "../../services/optionService"


export const NewOrder = () => {
    const [allchecked, setAllChecked] = useState([])
    const [size, setSize] = useState(0)
    const [cheese, setCheese] = useState(0)
    const [sauce, setSauce] = useState(0)

    const [allCheeses, setAllCheeses] = useState([])
    const [allSauces, setAllSauces] = useState([])
    const [allSizes, setAllSizes] = useState([])
    const [allToppings, setAllToppings] = useState([])

    const [pizzaObject, setPizzaObject] = useState({})

    useEffect(() => {
        
    }, [])

    const handlePizza = (size, cheese, sauce, allchecked) => {
        let pizza = { 
                     "sizeId": size,
                     "cheeseId": cheese,
                     "sauceId": sauce,
                     "toppingsArray": allchecked

        }
        setPizzaObject(pizza)
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
            <button onClick={handlePizza}>ADD PIZZA</button>
           </section>
           <section className="order">
             <h1>Order</h1>
                <ul></ul>      
           </section>
         </div>
        </div>
    )
}