import React, { useState, useEffect } from "react";

export function Post(props) {
  const [showBody, setShowBody] = useState(false);

  const toggleShowBody = () => {
    setShowBody(!showBody);
  };

  const postContentStyles = `transition-post
  ${
    showBody
      ? "show-content p-2 pt-md-4 px-md-4"
      : "hidden-content mx-2 mx-md-4"
  }
  `;

  const postStyles = `p-1 my-1 my-md-3 p-md-4 point text-center post
  rounded mx-auto col-10 col-sm-8 col-md-6 border`;

  const chevronDirection = `fas ${
    showBody ? "fa-chevron-up" : "fa-chevron-down"
  }`;

  const Chevron = () => {
    return (
      <span className="chevron-width-align">
        <i className={chevronDirection}></i>
      </span>
    );
  };

  return (
    <div className={postStyles} onClick={toggleShowBody}>
      <p className="post-title p-2 px-3 d-flex align-items-center rounded">
        <span className="flex-grow-1">{props.post.title}</span>
        <Chevron />
      </p>
      <p className={postContentStyles}>{props.post.body}</p>
    </div>
  );
}
