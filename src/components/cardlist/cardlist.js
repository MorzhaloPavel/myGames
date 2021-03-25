import React from "react";
import "./cardlist.css";
import Сard from "../cards/cards";

const CardList = ({ cards, onCardClick }) => (
  <div className="CardList">
    {cards.map(({ id, img, isSolved, isOpen }) => {
      return (
        <Сard
          key={id}
          id={id}
          img={img}
          isOpen={isOpen}
          isSolved={isSolved}
          onCardClick={onCardClick}
        />
      );
    })}
  </div>
);

export default CardList;
