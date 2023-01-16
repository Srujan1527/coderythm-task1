import React from "react";

const ItemCard = ({ docs }) => {
  return (
    <div>
      <ul>
        {docs.map((each) => (
          <li key={each._id}>{each.sentence}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemCard;
