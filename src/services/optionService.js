

export const CheeseService = () => {
    return fetch('http://localhost:8088/cheeses').then((res) => res.json())
}

export const SauceService = () => {
    return fetch('http://localhost:8088/sauces').then((res) => res.json())
}

export const SizeService = () => {
    return fetch('http://localhost:8088/sizes').then((res) => res.json())
}

export const ToppingService = () => {
    return fetch('http://localhost:8088/toppings').then((res) => res.json())
}