import React, { useEffect, useState } from "react";
import Sol from "../assets/images/sol.png"
import Nube from "../assets/images/nube.png"
import DiaNublado from "../assets/images/dia-nublado.png"
import Nublado from "../assets/images/nube-nube.png"
import CubiertoNiebla from "../assets/images/cubierto-niebla.png"
const Search = () => {
  //Estado
  const [climas, setClimas] = useState([]);
  const [search, setSearch] = useState("");

  //Consumo de API
  const url = "https://api.boostr.cl/weather.json";

  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setClimas(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  //Búsqueda de datos
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //Filtrado y ordenamiento de datos
let filteredResults = [];
if (!search) {
  filteredResults = climas;
} else {
  filteredResults = climas.filter((clima) =>
    clima.city.toLowerCase().includes(search.toLowerCase())
  );
}

// Ordenar alfabéticamente las ciudades
const sortedResults = filteredResults.slice().sort((a, b) => {
  const cityA = a.city.toLowerCase();
  const cityB = b.city.toLowerCase();
  if (cityA < cityB) {
    return -1;
  }
  if (cityA > cityB) {
    return 1;
  }
  return 0;
});

//Render a la vista
return (
  <div>
    <input
      type="text"
      placeholder="Buscar Localidad"
      className="form-control"
      value={search}
      onChange={handleSearch}
    />

    <table className="table table-hover my-4 shadow-lg">
      <thead>
        <tr>
          <th>Ciudad</th>
          <th>Temperatura</th>
          <th>Condición</th>
          <th>Humedad</th>
        </tr>
      </thead>

      <tbody>
        {sortedResults.map((clima) => (
          <tr key={clima.code}>
            <td>{clima.city}</td>
            <td>{clima.temperature}°</td>
            <td>
              {clima.condition === "Despejado" && (
                <img className="icono-clima" src={Sol} alt="Sol" />
              )}
              {clima.condition === "Cubierto" && (
                <img className="icono-clima" src={Nube} alt="Cubierto" />
              )}
              {clima.condition === "Nubosidad parcial" && (
                <img className="icono-clima" src={DiaNublado} alt="Nubosidad parcial" />
              )}
              {clima.condition === "Nublado" && (
                <img className="icono-clima" src={Nublado} alt="Nublado" />
              )}
              {clima.condition === "Cubierto y niebla" && (
                <img className="icono-clima" src={CubiertoNiebla} alt="Nublado" />
              )}
            </td>
            <td>{clima.humidity}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

};

export default Search;
