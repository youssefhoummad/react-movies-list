import React from "react";

const Like = ({ liked, onLiked }) => {
  const styles = () => {
    if (liked) {
      return "fa fa-heart";
    }
    return "fa fa-heart-o";
  };

  return (
    <div>
      <i
        style={{ cursor: "pointer" }}
        onClick={onLiked}
        className={styles()}
        aria-hidden="true"
      />
    </div>
  );
};

export default Like;
