import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Map from './Map';
import Layer from './Layer';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Map center={[12.068073749542236, 50.86839168405565]} zoom={16} width={1000} height={500}>
      <Layer serviceUrl="http://a.tile.osm.org/{z}/{x}/{y}.png" />
    </Map>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
