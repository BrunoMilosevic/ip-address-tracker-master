import "@popperjs/core";
import * as bootstrap from "bootstrap";
import "@/scss/styles.scss";
import { getData } from "./request";

let lat = 0;
let lng = 0; //Later to be added to marker below

let userInput = document.querySelector("#user-input");
let submitBtn = document.querySelector("#inputGroup-sizing-lg");
const ipAddressHeader = document.querySelector("#ip-address-header");
const locationHeader = document.querySelector("#location-header");
const timezoneHeader = document.querySelector("#timezone-header");
const ispHeader = document.querySelector("#isp-header");

const azurirajPodatke = (data) => {
  ipAddressHeader.textContent = data.ip;
  locationHeader.textContent = `${data.location.region}, ${data.location.country}`;
  timezoneHeader.textContent = data.location.timezone;
  ispHeader.textContent = data.isp;
  lat = data.location.lat;
  lng = data.location.lng;
  console.log(lat);
  console.log(lng);
  let map = L.map("map", {
    center: [lat, lng],
    zoom: 5,
  });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  var marker = L.marker([lat, lng]).addTo(map);
};

submitBtn.addEventListener("click", async function () {
  const enteredIp = userInput.value.trim();
  console.log(enteredIp);
  userInput.placeholder = "Search for any IP address";

  const apiUrl = "https://geo.ipify.org/api/v2/country,city?apiKey=";
  const apiKey = "at_kD0BbgUyupVVG3wkSigXb1RP15AV1";
  const upit = {};

  if (enteredIp) {
    upit.apiKey = apiKey;
    upit.ipAddress = enteredIp;
  } else {
    upit.apiKey = apiKey;
  }

  try {
    const data = await getData(apiUrl, upit);
    console.log(data);
    azurirajPodatke(data);
  } catch (error) {
    console.log(error);
    alert("Ip address you have entered is not valid");
  }
});
