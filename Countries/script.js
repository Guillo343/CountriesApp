// Main JS Code
let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${
                  data[0].currencies[Object.keys(data[0].currencies)].name
                } - ${Object.keys(data[0].currencies)[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages)
                  .toString()
                  .split(",")
                  .join(", ")}</span>
            </div>
        </div>
      `;
    })
    .catch(() => {
      if (countryName.length == 0) {
        result.innerHTML = `<h3>The input field cannot be empty</h3>`;
      } else {
        result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
      }
    });
});

// Suggestions 
let suggestionsList = document.getElementById("suggestions");

countryInp.addEventListener("input", () => {
  let searchTerm = countryInp.value.trim();
  if (searchTerm.length === 0) {
    // Clear suggestions when the input is empty
    suggestionsList.innerHTML = "";
  } else {
    // Fetch and display matching country names
    fetchCountryNames(searchTerm);
  }
});

function fetchCountryNames(searchTerm) {
  searchTerm = searchTerm.toLowerCase();

  // Make a request to the REST Countries API to fetch all country names
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      // Extract country names from the API response
      let countryNames = data.map((country) => country.name.common);

      // Filter matching country names
      let matchingCountries = countryNames.filter((name) => name.toLowerCase().includes(searchTerm));

      // Display matching country names as suggestions
      displaySuggestions(matchingCountries);
    })
    .catch((error) => {
      console.error("Error fetching country names:", error);
    });
}

// Functionality
function displaySuggestions(matches) {
  let html = "";
  matches.forEach((match) => {
    html += `<li>${match}</li>`;
  });
  suggestionsList.innerHTML = html;
}

function displaySuggestions(matches) {
    let html = "";
    matches.forEach((match) => {
      html += `<li>${match}</li>`;
    });
    suggestionsList.innerHTML = html;
  
    // Add an event listener to each suggestion for click handling
    let suggestionItems = suggestionsList.querySelectorAll("li");
    suggestionItems.forEach((suggestion) => {
      suggestion.addEventListener("click", () => {
        // Handle the suggestion click here
        countryInp.value = suggestion.textContent; // Fill the input with the clicked suggestion
        suggestionsList.innerHTML = ""; // Clear the suggestions
      });
    });
  }
  