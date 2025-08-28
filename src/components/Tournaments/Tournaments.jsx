

function Tournaments() {
  const tourneyList = [
    {
      id: "one",
      category: "Special Tournaments",
      tournament: [
      {
        title: "USCF Rated Chess",
        description: `Players in this section must be current members of the United States Chess Federation and bring their USCF membership card. 
        Check USCF website for information regarding fees. Memberships can be purchased at the tournament site. Bring chess clock and chess set as 
        there will be a limited number of chess sets available . All USCF rules are followed. Rated chess is available at all tournaments except 
        the SCA Statewide Primary, Elementary, Middle Championship, April Open, and Grade Level Tournaments.`,
        show: false
      },
      {
        title: "Regular Tournament",
        description: `At our regular tournaments we offer four sections: Primary PK-2, Elementary PK-5, Middle PK-8, and USCF Rated 
      PK-Adult. Younger players may always play up. Players in the USCF Rated PK-Adult section must either be or become a United States 
      Chess Federation member.`,
        show: false
      }
     ]
    },
    {
      id:"two",
      category: "Statewide Tournament",
      tournament: [{
        title: "SCA Statewide Championship",
        description: `This is statewide. All sorts of levels`,
        show: false
      }]
    }

  ];

  return (
    <div className="accordion" id="accordionExample">
      {tourneyList.map(({ id, category, tournament, alt, strong, body, show }) => (
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
              {category}
            </button>
          </h2>
          <div
            id={`collapse${id}`}
            className={`accordion-collapse collapse ${show ? "show" : ""}`}
            aria-labelledby={`heading${id}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body tennis-green">
              <img src={tournament}
                alt={alt} />
              <strong>{strong}</strong> {body}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Tournaments;
