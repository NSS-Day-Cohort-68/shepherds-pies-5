import { useState, useEffect } from "react";
import {
  addPizzaTopping,
  deletePizzaTopping,
  getAllPizzas,
  getAllToppings,
  updatedPizza,
} from "../../services/pizzaService";

export const EditPizza = ({
  inProgressPizza,
  allSizes,
  allCheeses,
  allSauces,
  allToppings,
  setAllToppings,
  setAllPizzas,
}) => {
  const [sizeRadio, setSizeRadio] = useState(0);
  const [cheeseRadio, setCheeseRadio] = useState(0);
  const [sauceRadio, setSauceRadio] = useState(0);
  const [toppingSelections, setToppingSelections] = useState([]);
  const [updatedToppingSelections, setUpdatedToppingSelections] = useState([]);

  useEffect(() => {
    setSizeRadio(inProgressPizza.sizeId);
    setCheeseRadio(inProgressPizza.cheeseId);
    setSauceRadio(inProgressPizza.sauceId);
    if (inProgressPizza.pizzaToppings) {
      const toppingIds = [];
      for (const topping of inProgressPizza.pizzaToppings) {
        toppingIds.push(topping.toppingId);
      }
      setToppingSelections(toppingIds);
      setUpdatedToppingSelections(toppingIds);
    }
  }, [inProgressPizza]);

  const handleSubmit = () => {
    const updatedPizzaObj = {
      id: inProgressPizza.id,
      sizeId: sizeRadio,
      cheeseId: cheeseRadio,
      sauceId: sauceRadio,
      orderId: inProgressPizza.orderId,
    };

    updatedPizza(updatedPizzaObj).then(() => {
      getAllPizzas().then((pizzas) => {
        setAllPizzas(pizzas);
      });
    });

    const updatedToppingIds = [...updatedToppingSelections];
    for (const toppingId of updatedToppingIds) {
      if (!toppingSelections.find((oldTopping) => oldTopping === toppingId)) {
        const newPizzaTopping = {
          pizzaId: inProgressPizza.id,
          toppingId: toppingId,
        };
        console.log("new pizza topping", newPizzaTopping);
        // post pizzaTopping
        addPizzaTopping(newPizzaTopping).then(() => {
          getAllToppings().then((updatedToppings) => {
            setAllToppings(updatedToppings);
          });
        });
      }
    }

    for (const toppingId of toppingSelections) {
      if (
        !updatedToppingSelections.find((newTopping) => newTopping === toppingId)
      ) {
        const pizzaToppingToDelete = inProgressPizza.pizzaToppings.find(
          (pizzaTopping) => pizzaTopping.toppingId === toppingId
        );
        console.log("pizza topping to delete", pizzaToppingToDelete);
        if (pizzaToppingToDelete.id) {
          deletePizzaTopping(pizzaToppingToDelete.id).then(() => {
            getAllToppings().then((updatedToppings) => {
              setAllToppings(updatedToppings);
            });
          });
        }
      }
    }
  };

  return (
    <>
      <section className="pizza-radios size">
        <h3 className="radio-heading">Sizes</h3>
        {allSizes.map((size) => {
          return (
            <>
              <input
                key={`size-${size.id}`}
                name="sizes"
                id={`size-${size.id}`}
                value={size.id}
                type="radio"
                checked={sizeRadio === size.id}
                onChange={(event) => {
                  setSizeRadio(parseInt(event.target.value));
                }}
              />
              <label htmlFor={`size-${size.id}`}>{size.size}</label>
            </>
          );
        })}
      </section>
      <section className="pizza-radios cheese">
        <h3 className="radio-heading">Cheeses</h3>
        {allCheeses.map((cheese) => {
          return (
            <>
              <input
                key={`cheese-${cheese.id}`}
                name="cheeses"
                id={`cheese-${cheese.id}`}
                value={cheese.id}
                type="radio"
                checked={cheeseRadio === cheese.id}
                onChange={(event) => {
                  setCheeseRadio(parseInt(event.target.value));
                }}
              />
              <label htmlFor={`cheese-${cheese.id}`}>{cheese.cheese}</label>
            </>
          );
        })}
      </section>
      <section className="pizza-radios sauce">
        <h3 className="radio-heading">Sauces</h3>
        {allSauces.map((sauce) => {
          return (
            <>
              <input
                key={`sauce-${sauce.id}`}
                name="sauces"
                id={`sauce-${sauce.id}`}
                value={sauce.id}
                type="radio"
                checked={sauceRadio === sauce.id}
                onChange={(event) => {
                  setSauceRadio(parseInt(event.target.value));
                }}
              />
              <label htmlFor={`sauce-${sauce.id}`}>{sauce.sauce}</label>
            </>
          );
        })}
      </section>
      <section className="pizza-checkboxes toppings">
        <h3 className="radio-heading">Toppings</h3>
        {allToppings.map((topping) => {
          return (
            <>
              <input
                key={`topping-${topping.id}`}
                name="toppings"
                id={`topping-${topping.id}`}
                value={topping.id}
                type="checkbox"
                checked={updatedToppingSelections.includes(topping.id)}
                onChange={(event) => {
                  const toppingArrayCopy = [...updatedToppingSelections];
                  if (event.target.checked) {
                    toppingArrayCopy.push(parseInt(event.target.value));
                    setUpdatedToppingSelections(toppingArrayCopy);
                  } else {
                    const indexToRemove = toppingArrayCopy.findIndex(
                      (id) => parseInt(event.target.value) === id
                    );
                    toppingArrayCopy.splice(indexToRemove, 1);
                    setUpdatedToppingSelections(toppingArrayCopy);
                  }
                }}
              />
              <label htmlFor={`topping-${topping.id}`}>{topping.topping}</label>
            </>
          );
        })}
      </section>
      <button className="save-pizza-btn" onClick={handleSubmit}>
        Save Pizza
      </button>
    </>
  );
};
