import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Card";

const Card = ({
  word,
  createdAt,
  _id,
  definition,
  exampleOne,
  exampleTwo,
  status,
  type,
}) => {
  const { setEditCard, deleteCard } = useAppContext();

  const [flip, setFlip] = useState(false);

  const flipHandle = () => {
    setFlip(!flip);
  };

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <div className="flip-card" onClick={flipHandle}>
        <div
          className={
            flip ? "flip-card-inner flip-card-active" : "flip-card-inner"
          }
        >
          <div className="flip-card-front">
            <div className="main-icon">{word.charAt(0)}</div>
            <div className="info">
              <div>
                <h5>{word}</h5>
              </div>

              <div className={`status ${status}`}>{status}</div>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="info">
              <h5>{definition}</h5>
              <p className="card-type">{type}</p>
              {/* <p className="example">
                {exampleOne || exampleTwo ? "Examples:" : null}
              </p> */}
              <p className="example">{exampleOne}</p>
              <p>{exampleTwo}</p>
            </div>
            <footer>
              <div className="actions">
                <Link
                  to="/add-card"
                  onClick={() => setEditCard(_id)}
                  className="btn edit-btn"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={() => deleteCard(_id)}
                >
                  Delete
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Card;
