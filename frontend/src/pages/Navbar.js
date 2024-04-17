import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [currLocation, setCurrLocation] = useState({});
  const [weather, setWeather] = useState({});
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  //api for weather and temparature
  const api = {
    key: 'b53ecf4db7f774218469fe2d868a1ad0',
    base: 'https://api.openweathermap.org/data/2.5/',
  };

  const getLocation = async () => {
    try {
      const location = await axios.get('https://ipapi.co/json'); /// api for current location
      setCurrLocation(location.data);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`${api.base}weather`, {
        params: {
          q: city,   ///here city is get from current location
          units: 'metric',
          APPID: api.key,
        },
      });
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (currLocation.city) {
      fetchWeather(currLocation.city);/// passed city from current location
    }
  }, [currLocation]); // here  data is being fetched when current is location changes

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleGenerateTable = () => {
    navigate('/table'); // Navigate to the DataTable when the table option is clicked
  };

  return (
    <nav className="navbar navbar-light bg-light" style={{ border: '1px solid black', marginLeft: 50, marginRight: 40,marginTop:30 }}>
      <div className="container-fluid">
        <div className="row w-100 align-items-center">
          <div className="col-auto">
            {typeof weather.main !== 'undefined' && (
              <p>{weather.name}, {weather.main.temp}°C, {weather.weather[0].main}</p>
            )}
          </div>
          <div className="col d-flex justify-content-end">
            <button className="btn btn-secondary mx-2">1 Hr</button>
            <button className="btn btn-info mx-2">8 Hr</button>
            <button className="btn btn-primary mx-2">16 hr</button>
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleToggleCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>

        <div className={`collapse ${collapsed ? '' : 'show'}`} id="navbarToggleExternalContent">
          <div className="bg-light p-4">
            <button className="btn btn-primary" onClick={handleGenerateTable}>Generate Summary Table</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

