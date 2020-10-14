import React from "react";

const ListGroup = ({
  items,
  selectedItem,
  onSelectItem,
  textProperty,
  valueProperty
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty] || item[textProperty]}
          onClick={() => onSelectItem(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
