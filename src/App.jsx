import { useRef, useState, useCallback, useEffect } from "react";
import "./App.css";
import useCity from "./hooks/useCity";
import Chart from "./components/chart";
import {BsFillCloudSunFill} from 'react-icons/bs';

function App() {
  const [temperature, setTemperature] = useState([]);
  const [temp, setTemp] = useState([])
  const [icon, setIcon] = useState('')
  const [coord, setCoord] = useState({});
  const [city, setCity] = useState([]);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);
  const [datasets, setDatasets] = useState({
    labels: [],
    datasets: [],
  });
  const [datasetLine, setDatasetLine] = useState({
    labels: [],
    datasets: [],
  });
  const [datasetPie, setDatasetPie] = useState({
    labels: [],
    datasets: [],
  });

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const API_City = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=6&appid=d95c353ff7b97c4333dda1a8c3c999e7`;
  const dataCity = useCity(API_City);

  const handleCity = (data) => {
    setCity([...city, data]);
    setCoord({ lat: data.lat, lon: data.lon });
    console.log(icon)

  };

  const handleEliminar = () => {
/*     console.log(datasetPie.datasets)
    setCoord({lat:null, lon:null})
    setCity(
      city.filter((value) => !(value.lat == item.lat && value.lon == item.lon))
    );
    ({
      ...datasets,
      datasets: datasets.datasets.filter(
        (value) => !(value.lat == item.lat && value.lon == item.lon)
      ),
    });
    let index = datasetLine.labels.indexOf(item.name);
    datasetLine.datasets.map((item) => item.data.splice(index, 1));
    datasetLine.labels.splice(index,1)
    datasetPie.datasets.map((item) => item.data.splice(index, 1));
    datasetPie.labels.splice(index,1)
    datasetPie.datasets.map(item => item.backgroundColor.splice(index,1))
    console.log('background', datasetPie.datasets.map(item => item.backgroundColor)) */
    setCity([])
    setCoord({lat:null, lon:null})
    setDatasets({labels: [],
      datasets: [],})
    setDatasetLine({labels: [],
      datasets: [],})
    setDatasetPie({labels: [],
      datasets: [],})
    setTemp([])
    setIcon([])
  };

  const filterCity = dataCity.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container">
      <h1 className="title">Weather Report <BsFillCloudSunFill/></h1>
      <div className={city.length != 0 ? 'container-box' : 'container-box-nograph'}>
        <div className="container-search">
          <h2>Insertar una Ciudad</h2>
          <input
            placeholder="Buscar una ciudad"
            type="text"
            value={search}
            ref={searchInput}
            onChange={handleSearch}
          />
        </div>
        <div className="box-searchcity">
        <div className="container-city">
          {filterCity.map((data) => (
            <div className="searchcity">
              <p><b>City - State:</b><br></br> {data.name} - {data.state}</p>
        
              <button className="btn-temperature" onClick={() => handleCity(data)}>Ver Temperatura</button>

            </div>
          ))}
        </div>
          </div>
        <div className="container-graph">
          <div className="container-cities">
            {city.map((item, i) => (
              <div className="container-city-chart">
                <h1>Info</h1>
                <p>
                <b> City - State:</b> <br></br>
                  {item.name} - {item.state}
                </p>
                  <p>
                  <b>Country-code:</b><br></br>
                  {item.country}             
                    </p>
                    <p><b>Temperature: </b>{Math.floor(temp[i])+'º'}</p>
                    <p><b>{icon[i]?.main}</b></p>
                    <div className="weather-icon">
                    <img src={`http://openweathermap.org/img/wn/${icon[i]?.icon}@2x.png`}/><p>{icon[i]?.description}</p>
                    </div>
                    <p><b>Location:</b></p>
                    <div><iframe width="383" height="300"src={`https://maps.google.com/maps/@${item.lat},${item.lon},15z`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div>
                {/* <button onClick={() => handleEliminar(item)}>Eliminar</button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
          {city.length != 0 ? (
            <div className="chart">
              <button onClick={handleEliminar}>Limpiar</button>

  
                  <Chart
                  data1={city}
                  temperature={temperature}
                  icon={icon}
                  setIcon={setIcon}
                  setTemperature={setTemperature}
                  tempArray={temp}
                  setTempArray={setTemp}
                  coord={coord}
                  dataset={datasets}
                  setDatasets={setDatasets}
                  datasetLine={datasetLine}
                  setDatasetLine={setDatasetLine}
                  datasetPie={datasetPie}
                  setDatasetPie={setDatasetPie}
                  />

              </div>
          ) : null}
    </div>
  );
}

export default App;
