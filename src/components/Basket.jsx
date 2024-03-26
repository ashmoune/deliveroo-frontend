import React from "react";

function Basket({ basket, removeFromBasket, newItem }) {
  return (
    <div className="basket">
      {basket.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        basket.map((item, index) => {
          return (
            <div key={index}>
              <button
                onClick={(item) => {
                  removeFromBasket(item);
                }}
              >
                -
              </button>

              <button onClick={() => newItem(index)}>+</button>
              {item.title}
              {item.price}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Basket;
