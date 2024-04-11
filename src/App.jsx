import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/logo-deliveroo.svg";
import Basket from "./components/Basket";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--deliveroo-backend--rh6mx4gc4kyd.code.run/"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // fonction pour ajouter un plat dans le panier
  const addToBasket = (meal) => {
    const existingItemIndex = basket.findIndex((item) => item.id === meal.id);
    console.log(fetchData);
    if (existingItemIndex !== -1) {
      // Si l'article est déjà dans le panier, augmentez simplement sa quantité
      const newBasket = [...basket];
      newBasket[existingItemIndex].quantity++;
      setBasket(newBasket);
    } else {
      // Sinon, ajoutez l'article au panier avec une quantité de 1
      setBasket([...basket, { ...meal, quantity: 1 }]);
    }
  };

  // fonction qui enlève un plat du panier
  const removeFromBasket = (index) => {
    const newBasket = [...basket];
    newBasket.splice(index, 1);
    setBasket(newBasket);
  };

  // fonction qui ajoute une quantité à un élément du panier
  const incrementItem = (index) => {
    const newBasket = [...basket];
    newBasket[index].quantity++;
    setBasket(newBasket);
  };

  // fonction qui enlève une quantité à un élément du panier
  const decrementItem = (index) => {
    const newBasket = [...basket];
    if (newBasket[index].quantity > 1) {
      newBasket[index].quantity--;
      setBasket(newBasket);
    } else {
      removeFromBasket(index);
    }
  };

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <header className="container ">
        <img className="logo" src={logo} alt="" />
      </header>
      <div className=" top-section ">
        <div className="leftbloc">
          <h1>{data.restaurant.name}</h1> <p>{data.restaurant.description}</p>
        </div>
        <div className="rightbloc">
          <img src={data.restaurant.picture} alt="" />
        </div>
      </div>
      <main className="container main-container">
        <div className="col-left">
          {data.categories.map((category) => {
            // si la catégorie n'a pas de plats , on ne l'affiche pas
            if (category.meals.length !== 0) {
              return (
                <div className="menu-container container" key={category.name}>
                  <h2>{category.name}</h2>
                  <div className="articles-container">
                    {category.meals.map((meal) => {
                      return (
                        <button key={meal.id} onClick={() => addToBasket(meal)}>
                          <div>
                            <h3>{meal.title}</h3>
                            <p className="description">{meal.description}</p>
                            <span>{meal.price} €</span>
                            {meal.popular && <span>Populaire</span>}
                          </div>

                          {meal.picture && (
                            <img src={meal.picture} alt={meal.title} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="col-right">
          <Basket
            basket={basket}
            removeFromBasket={removeFromBasket}
            incrementItem={incrementItem}
            decrementItem={decrementItem}
          />
        </div>
      </main>
    </>
  );
}

export default App;
