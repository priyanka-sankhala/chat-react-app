import React from 'react'
import { useHistory } from "react-router-dom";

export default function PageNotFound() {
    let history = useHistory();

  function handleClick() {
    history.push("/login");
  }
    return (
        <div>
            <h1>Page Not Found</h1>
            <button type="button" onClick={handleClick}>
      Go home
    </button>
        </div>
    )
}
