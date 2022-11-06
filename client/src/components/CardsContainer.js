import React from "react";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Card from "./Card";
import Wrapper from "../assets/wrappers/CardsContainer";

const CardsContainer = () => {
  const { getCards, cards, isLoading, page, totalCards } = useAppContext();

  useEffect(() => {
    getCards();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  if (cards.length === 0) {
    return (
      <Wrapper>
        <h2>No cards to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalCards} card{cards.length > 1 && "s"} found
      </h5>
      <div className="cards">
        {cards.map((card) => {
          return <Card key={card._id} {...card} />;
        })}
      </div>
    </Wrapper>
  );
};

export default CardsContainer;
