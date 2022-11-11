import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Loading, Card, Alert } from ".";
import Wrapper from "../assets/wrappers/CardsContainer";
import { PageBtnContainer } from ".";

const CardsContainer = () => {
  const {
    getCards,
    cards,
    isLoading,
    page,
    totalCards,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getCards();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);

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
      {showAlert && <Alert />}
      <h5>
        {totalCards} card{cards.length > 1 && "s"} found
      </h5>
      <div className="cards">
        {cards.map((card) => {
          return <Card key={card._id} {...card} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default CardsContainer;
