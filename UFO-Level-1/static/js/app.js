// Storing the data.js info in the table data variable
var tableData = data;

// Referencing the tbody and creating a function to add the data in the table rows inside a row variable
var tbody = d3.select("tbody");
function addingTableData(data) {
    var row = tbody.append("tr");

    // Object loop that checks that keys and values are in same order every iteration
    Object.entries(data).forEach(([key, value]) => {
        row.append("td").text(value); 
    })
};

// Appending all table rows and data 
data.forEach(addingTableData);

// Button variable that stores the filter button tag and calls d3 to select it
var button = d3.select("#filter-btn");

// Activating the button function and using prevent default to have button Oonly work clicked or user presses enter button
button.on("click", function() {
    d3.event.preventDefault();
    
    // Creating Variables that grab the datetime along with its value and creating a holder for the filtered data
    var dateholder = d3.select("#datetime");
    var timeholder = dateholder.property("value");
    var filterholder = {};

    // If statement that starts with checking if timeholder variable is not empty then do the following
    if (timeholder !== "") {
        filterholder.datetime = timeholder;
    }
    // Passing filters parameter, storing city, state, country, and shape filter value and placing the data as lowercased
    if (filters) {
        var citysliced = d3.select("#City-filter");
        var city = citysliced.property("value").toLowerCase();

        if (city !== "") {
            filterholder.city = city;
        }

        var statesliced = d3.select("#State-filter");
        var state = statesliced.property("value").toLowerCase();

        if (state !== "") {
            filterholder.state = state;
        }

        var countrysliced = d3.select("#Country-filter");
        var country = countrysliced.property("value").toLowerCase();

        if (country !== "") {
            filterholder.country = country;
        }

        var shapesliced = d3.select("#Shape-filter");
        var shape = shapesliced.property("value").toLowerCase();
        
        if (shape !== "") {
            filterholder.shape = shape;
        }
    }

    // Returning the data and making sure that the key matches the value for each data for proper mapping
    var filtered = tableData.filter(obj => {
        var propermatch = true;
        Object.entries(filterholder).forEach(([key, value]) => {
            propermatch = propermatch && (obj[key] === value);
        });
        return propermatch;
    });
    
    // Checking to see what was returned in the console and looping through addingTableData
    console.log(filtered);
    tbody.html("");
    filtered.forEach(addingTableData);
});

// Selecting the reset html tag and the more filter button tag and at this point passing the filters variable as false
var resetattempt = d3.select("#reset-filter-btn");
var filterattempt = d3.select("#more-filter-btn");
var filters = false;

// Allowing the folter button to be clicked and passing filters variable as true now
filterattempt.on("click", function() {
    d3.event.preventDefault();
    filters = true;

    // Use for loop to create additional filters
    var filters = d3.select("#filters");
    const filterlist = ["City", "State", "Country", "Shape"];

    //Loop that takes place for every item in the filterlist that displays what is supposed to be filtered
    filterlist.forEach(d => {
        var newfilter_list = filters.append("li").attr("class","filter list-group-item");
        newfilter_list.append("label").attr("for", d).text(`Enter a ${d}`);
        newfilter_list.append("input").attr("class", "form-control")
                             .attr("type", "text")
                             .attr("id", `${d}-filter`);
    });
    filterattempt.style("display", "none");
    resetattempt.style("display", "block");
});

// Reset button that is supposed to clear filters and displays all data
resetattempt.on("click", function() {
    d3.event.preventDefault();
    var everyfilter = d3.selectAll("input")
                       .property("value", "");
    data.forEach(addingTableData);
});