import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";

function Header() {


  return (
    <div className="Header">
      <h1 className="green-text">School Chess Association</h1>
      <img src="https://schoolchess.org/old/images/knightlogo.jpg"/>
      <Nav />
    </div>
  );
}

export default Header;
