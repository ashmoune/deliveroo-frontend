import React from "react";

function Basket({ basket, incrementItem, decrementItem }) {
  // Calcul du sous-total du panier
  const subTotal = basket.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="basket">
      {basket.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          <button>Valider mon panier</button>
          {basket.map((item, index) => {
            return (
              <div key={index}>
                <button onClick={() => decrementItem(index)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => incrementItem(index)}>+</button>
                <span>{item.title}</span>
                <span>{item.price} €</span>
              </div>
            );
          })}
          <div>
            <p>Sous-Total {subTotal.toFixed(2)} €</p>
            <p>Frais de livraison 2,50€</p>
            <p>Total {(subTotal + 2.5).toFixed(2)}€</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Basket;
