import React from "react";
import "./cards.css";

const Сard = ({ id, img, isSolved, isOpen, onCardClick }) => {
  return (
    <div
      id={id}
      className={isOpen ? "card flipped" : "card"}
      onClick={() => !isSolved && onCardClick({ id, img, isSolved, isOpen })}
    >
      <div
        style={{ backgroundImage: `url(${img})` }}
        className={isSolved ? "checkCards front" : "front"}
      />
      <div className="back" />
    </div>
  );
};

export default Сard;
