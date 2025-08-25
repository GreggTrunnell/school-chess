import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";

function Header() {
  const images = [
    "https://schoolchess.org/old/images/primary_champ_2025.jpeg?x=20250506150359",
    "https://schoolchess.org/old/images/elementary_champ_2025.jpeg?x=20250506155801",
    "https://schoolchess.org/old/images/middle_champ_2025.jpeg?x=20250506160128",
    "https://schoolchess.org/old/images/coachoftheyear2025.jpeg?x=20250506161611",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // change every 2 seconds

    return () => clearInterval(interval); // cleanup
  }, [images.length]);

  return (
    <div className="Header">
      <h1 className="green-text">School Chess Association</h1>
      <Nav />
      <img
        src={images[currentIndex]}
        alt="Slideshow"
        style={{ width: "400px", height: "375px", borderRadius: "12px" }}
      />
    </div>
  );
}

export default Header;
