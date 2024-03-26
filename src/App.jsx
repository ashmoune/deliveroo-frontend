import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/logo-deliveroo.svg";
import Basket from "./components/Basket";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [basket, SetBasket] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--deliveroo-backend--rh6mx4gc4kyd.code.run/"
    );
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // fonction pour ajouter un plat dans le panier
  const addToBasket = (meal) => {
    SetBasket([...basket, meal]);
  };
  // fonction qui enleve les plats dans le panier
  const removeFromBasket = (index) => {
    const newBasket = [...basket];
    newBasket.splice(index, 1);
    SetBasket(newBasket);
  };
  // fonction qui ajoute un élément dans le apnier
  const newItem = (index) => {
    addToBasket(basket[index]);
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
            newItem={newItem}
          />
        </div>
      </main>
    </>
  );
}

export default App;
