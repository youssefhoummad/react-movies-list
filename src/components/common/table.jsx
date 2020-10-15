import React from "react";

const Table = ({ liked, onLike }) => {
  return (
    <div>
      <i
        style={{ cursor: "pointer" }}
        onClick={onLike}
        className={styles()}
        aria-hidden="true"
      />
    </div>
  );
};

export default Table;
