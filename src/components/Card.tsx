import React from "react";

interface ComponentProps {
  title: string;
  _id: string;
}

const Card: React.FC<ComponentProps> = ({ title, _id }) => {
  return (
    <div
      onClick={() => {
        console.log("HELLO WORD");
      }}
    >
      <h2>{title}</h2>
      <a href={`/card?id=${_id}`}>ir a card</a>
    </div>
  );
};

export default Card;
