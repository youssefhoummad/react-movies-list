import React from "react";

const Like = ({ liked, onLike }) => {
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
        onClick={onLike}
        className={styles()}
        aria-hidden="true"
      />
    </div>
  );
};

export default Like;
