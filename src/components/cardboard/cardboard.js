import React, { Component } from "react";
import CardList from "../cardlist/cardlist";
import "./cardboard.css";
import Title from "../title/title";
import Header from "../header/header";
import list from "../../const";
import { shuffle } from "../../utils";
import Timer from "../timers/timers";

export default class CardBoard extends Component {
  state = {
    cards: shuffle(list),
    seconds: 0,
    counter: 0,
    solvedCardsNumber: 16,
  };

  restartGames = () => {
    const cards = shuffle(list);
    const seconds = 0;
    const counter = 0;
    const solvedCardsNumber = 16;
    this.setState({ cards, seconds, counter, solvedCardsNumber });
  };

  flippedCards = [];

  handleFlipCard = ({ id, img }) => {
    if (
      this.flippedCards.length === 2 ||
      (this.flippedCards[0] && this.flippedCards[0].id === id)
    ) {
      return;
    } else if (this.flippedCards[0]) {
      this.addCard(img, id);
      console.log(this.state.solvedCardsNumber);
      setTimeout(this.checkCards, 1000);
    } else {
      this.addCard(img, id);
    }
  };

  checkCards = () => {
    const [firstCard, secondCard] = this.flippedCards;
    if (firstCard.img === secondCard.img) {
      this.setState(
        ({ cards, counter, solvedCardsNumber }) => ({
          solvedCardsNumber: solvedCardsNumber - 2,
          counter: counter + 3,
          cards: cards.map((card) => {
            if (card.img === firstCard.img) {
              return {
                ...card,
                isSolved: true,
              };
            } else {
              return card;
            }
          }),
        }),
        this.clearTimer
      );
    } else {
      this.setState(({ cards, counter }) => ({
        counter: counter - 1,
        cards: cards.map((card) => {
          if (card.img === firstCard.img || card.img === secondCard.img) {
            return {
              ...card,
              isOpen: false,
            };
          } else {
            return card;
          }
        }),
      }));
    }
    this.flippedCards = [];
  };

  clearTimer = () => {
    if (this.state.solvedCardsNumber == 0) {
      clearInterval(this.interval);
    }
  };

  addCard = (imgToAdd, idToAdd) => {
    this.flippedCards.push({ img: imgToAdd, id: idToAdd });
    this.setState(({ cards }) => ({
      cards: cards.map((card) => {
        if (card.id === idToAdd) {
          return {
            ...card,
            isOpen: true,
          };
        } else {
          return card;
        }
      }),
    }));
  };

  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  render() {
    const { cards, seconds, counter, solvedCardsNumber } = this.state;

    return (
      <div className="CardBoard">
        <Title />
        <Header counter={counter} restartGames={this.restartGames} />
        {solvedCardsNumber === 0 ? (
          <div className="FinishGames">
            <h1>You are Winner!!!!</h1>
          </div>
        ) : (
          <CardList cards={cards} onCardClick={this.handleFlipCard} />
        )}

        <Timer seconds={seconds} />
      </div>
    );
  }
}
