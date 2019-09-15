// Data not showing up in html and not sure why?
// Variable storing the data in tableData
var tableData = data;

// Referencing the the tbody element along with corresponding tbody feilds and buttons

var tbody = document.querySelector("#tbody");
var dateInput = document.querySelector("#datetime");
var cityInput = document.querySelector("#city");
var stateInput = document.querySelector("#state");
var countryInput = document.querySelector("#country");
var shapeInput = document.querySelector("#shape");
var filterBtn = document.querySelector("#durationMinutes");
var resetBtn = document.querySelector("#comments");

// Event Listeners for the filter button and created reset button

filterBtn.addEventListener("click", handleSearchButtonClick);
resetBtn.addEventListener("click", handleResetButtonClick);

// Renders the Table
function manifestTable() {
  tbody.innerHTML = "";
  for (var i = 0; i < tableData.length; i++) {
    
    // Grabs the sighting object and filds
    var sighting = tableData[i];
    var fields = Object.keys(sighting);
    
    // Creates a new row in the tbody while setting index to be i + 
    var row = tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      
      // For every field in the sighting object creates new cell at set its inner text to be the current value
      var field = fields[j];
      var cell = row.insertCell(j);
      cell.innerText = sighting[field];
    }
  }
}

function handleSearchButtonClick() {
  
  // Goes through items with formatted user's search 

  var filterDate = dateInput.value.trim();
  if (filterDate != "") {
    tableData = data.filter(function (sighting) {
      var sightingDate = sighting.datetime;
      return sightingDate === filterDate;
    });
  };
 
  var filterCity = cityInput.value.trim().toLowerCase();
  if (filterCity != "") {
    tableData = tableData.filter(function (sighting) {
      var sightingCity = sighting.city;
      return sightingCity === filterCity;
    });
  };
  
  var filterState = stateInput.value.trim().toLowerCase();
  if (filterState != "") {
    tableData = tableData.filter(function (sighting) {
      var sightingState = sighting.state;
      return sightingState === filterState;
    });
  };
  
  var filterCountry = countryInput.value.trim().toLowerCase();
  if (filterCountry != "") {
    tableData = tableData.filter(function (sighting) {
      var sightingCountry = sighting.country;
      return sightingCountry === filterCountry;
    });
  };
  
  var filterShape = shapeInput.value.trim().toLowerCase();
  if (filterShape != "") {
    tableData = tableData.filter(function (sighting) {
      var sightingShape = sighting.shape;
      return sightingShape === filterShape;
    });
  };
  
  manifestTable();
};


// Resets search data after search

function handleResetButtonClick() {
  tableData = data;
  dateInput.value = "";
  cityInput.value = "";
  stateInput.value = "";
  countryInput.value = "";
  shapeInput.value = "";
  manifestTable();
}

manifestTable();