
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import "leaflet-sidebar-v2/js/leaflet-sidebar.js";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";



// needed to properly load the images in the Leaflet CSS
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

// from https://switch2osm.org/using-tiles/getting-started-with-leaflet/
var map = L.map("map").setView({ lon: 0, lat: 0 }, 2);

// add the OpenStreetMap tiles
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);

// show the scale bar on the lower left corner
L.control.scale().addTo(map);


// add sidebar

const sidebar = L.control.sidebar({ container: 'sidebar'}).addTo(map);

sidebar.addPanel({
    id: 'home',
    tab: '<i class="fa fa-home">',
    title: 'home',
    pane: "<p>Home</p>"
});

//sidebar.open("home");

// show a marker on the map
L.marker({ lon: 0, lat: 0 }).bindPopup("The center of the world").addTo(map);

map.on('popupopen', (e) => {
    sidebar.open("home");
});

map.on('popupclose', (e) => {
    sidebar.close();
});
