import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/logo-deliveroo.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
                        <article key={meal.id}>
                          <div>
                            <h3>{meal.title}</h3>
                            <p className="description">{meal.description}</p>
                            <span>{meal.price} €</span>
                            {meal.popular && <span>Populaire</span>}
                          </div>

                          {meal.picture && (
                            <img src={meal.picture} alt={meal.title} />
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
          <div className="col-right"></div>
        </div>
      </main>
    </>
  );
}

export default App;
