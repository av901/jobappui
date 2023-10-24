import React from "react";
import ReactDOM from "react-dom";


const render = () => {
  ReactDOM.render(
   <div><p>hello world</p></div>,
    document.getElementById("root")
  );
};

render();

if (module.hot) {
  module.hot.accept("./index", () => {
    render();
  });
}
