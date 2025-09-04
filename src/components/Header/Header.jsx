import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";

function Header() {


  return (
    <div className="Header">
      <h1 className="green-text">School Chess Association</h1>
       <div>
        <img src="  https://schoolchess.org/old/images/knightlogo.jpg" alt="Knight Logo" />
      </div>
      <Nav />
    </div>
  );
}

export default Header;
