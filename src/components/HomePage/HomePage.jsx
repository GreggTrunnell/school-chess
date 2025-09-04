import { useState, useEffect } from "react";
import "./HomePage.css"; // 👈 we’ll put fade styles here

function HomePage() {
  const slides = [
    {
      src: "https://schoolchess.org/old/images/primary_champ_2025.jpeg?x=20250506150359",
      caption: "Well done to our 2025 Statewide Tournament Champions!",
      subCaption: "Primary Champion: Rihaan Sen"
    },
    {
      src: "https://schoolchess.org/old/images/elementary_champ_2025.jpeg?x=20250506155801",
      caption: "Well done to our 2025 Statewide Tournament Champions!",
      subCaption: "Elementary Champion: Harrison Tan",
    },
    {
      src: "https://schoolchess.org/old/images/middle_champ_2025.jpeg?x=20250506160128",
      caption: "Well done to our 2025 Statewide Tournament Champions!",
      subCaption: "Middle Champion: Neil Vartak",
    },
    {
      src: "https://schoolchess.org/old/images/coachoftheyear2025.jpeg?x=20250506161611",
      caption: "Congratulations 2025 Coach of the Year!",
      subCaption: "Veronica Harrison",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setFade(true); // fade-in new image
      }, 500); // matches fade duration in CSS
    }, 3000); // show each image for ~2s + 0.5s fade

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="HomePage">
      <div className="slideshow">
        <img
          src={slides[currentIndex].src}
          alt={slides[currentIndex].caption}
          className={`slide ${fade ? "fade-in" : "fade-out"}`}
        />
        <p className="caption">{slides[currentIndex].caption}</p>
        <p className="sub-caption">{slides[currentIndex].subCaption}</p>
      </div>
    </div>
  );
}

export default HomePage;
