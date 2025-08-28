

function Tournaments() {

  //I orginally did not use an array for the different sections. Changing it to a .map eliminates clutter in return statement, reads easier,
  //much better for scalability. 
  const tourneyList = [{
     
      id: "one",
      title: "Special Tournaments",
      tournament: [{
        title: "USCF Rated Chess",
        description: `Players in this section must be current members of the United States Chess Federation and bring their USCF membership card. 
        Check USCF website for information regarding fees. Memberships can be purchased at the tournament site. Bring chess clock and chess set as 
        there will be a limited number of chess sets available . All USCF rules are followed. Rated chess is available at all tournaments except 
        the SCA Statewide Primary, Elementary, Middle Championship, April Open, and Grade Level Tournaments.` 
      }],
      show: false
    ,

  }
   
  ];

return (
    <div className="accordion" id="accordionExample">
      {tourneyList.map(({ id, title, image, alt, strong, body, show }) => (
        <div className="accordion-item" key={id}>
          <h2 className="accordion-header" id={`heading${id}`}>
            <button
              className={`accordion-button ${!show ? "collapsed" : ""}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${id}`}
              aria-expanded={show}
              aria-controls={`collapse${id}`}
            >
              {title}
            </button>
          </h2>
          <div
            id={`collapse${id}`}
            className={`accordion-collapse collapse ${show ? "show" : ""}`}
            aria-labelledby={`heading${id}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body tennis-green">
              <img src={image}
              alt={alt}/>
              <strong>{strong}</strong> {body}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Tournaments;
