// Map and Screen
const mymap = L.map('issMap', {
  fullscreenControl: true,
  fullscreenControlOptions: {
  position: 'topleft'
  }}).setView([0, 0], 2);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Icon
const issIcon = L.icon({
  iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/1086/1086061.svg',
  iconSize: [50, 32],
  iconAnchor: [25, 16]
});


// Conexion a la API
let marker = null
const actualizar = () => {
  const api_url ='http://api.open-notify.org/iss-now.json';
  fetch(api_url)
      .then(res => res.json())
      .then(data => {
        if (marker){
          mymap.removeLayer(marker);
          mymap.removeLayer(isscirc);

        }
        const {latitude, longitude} = data.iss_position;
        marker = L.marker([latitude, longitude], { icon: issIcon });
        isscirc = L.circle([latitude, longitude], 1400000, {
          color: 'red',
          fillColor: '#00ff00',
          fillOpacity: 0.3
        });
        coordenadas = 'Latitud: ' + latitude +' , Longitud:' + longitude;
        marker.bindTooltip(coordenadas,  {permanent: true, className: "label", offset: [20, 20] });
        marker.addTo(mymap);
        isscirc.addTo(mymap);
      });
  setTimeout(actualizar, 1000); // actualizar cada 1 segundo

};
actualizar();
