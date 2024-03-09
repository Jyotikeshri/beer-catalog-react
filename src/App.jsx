import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((response) => response.json())
      .then((data) => setBeers(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search for beers..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          height: "30px",
          padding: "3px",
          borderRadius: "20px",
          backgroundColor: "transparent",
          color: "black",
          border: "1px solid black",
        }}
      />
      <div
        className="beer-list"
        style={{ flexWrap: "wrap", display: "flex", justifyContent: "center" }}
      >
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="beer-card" style={{ margin: "50px" }}>
            <img
              src={beer.image_url}
              alt={beer.name}
              style={{
                height: "400px",
                width: "150px",
              }}
            />
            <h2>{beer.name}</h2>
            <p style={{ fontStyle: "italic" }}>{beer.tagline}</p>
            <p>First brewed: {beer.first_brewed}</p>
            <p>ABV: {beer.abv}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
