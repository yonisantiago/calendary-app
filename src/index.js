import React from "react";
//import ReactDOM from 'react-dom'; // react 17
import { BrowserRouter } from "react-router-dom";
import { CalendarApp } from "./CalendarApp";
import { createRoot } from "react-dom/client"; //used in react 18
import "./styles.css";

//console.log(process.env);
//REACT 18
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <CalendarApp />
  </BrowserRouter>
);

//REACT 17
// ReactDOM.render(
//   <BrowserRouter>
//     <CalendarApp />
//   </BrowserRouter>,
//   document.getElementById('root')
// );
