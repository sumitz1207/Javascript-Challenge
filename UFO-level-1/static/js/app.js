//this is the data from data.js
const info = data;

//get table body info from data.js to create table on index page
const table_ref = d3.select("tbody");

function createTable(data) {
  table_ref.html("");

  //For loop through the data
  //and append on row each of the table columns, set text for each cell from data.js
  data.forEach((item) => {
    let row = table_ref.append("tr");
    let date = row.append("td");
    let city = row.append("td");
    let state = row.append("td");
    let country = row.append("td");
    let shape = row.append("td");
    let duration = row.append("td");
    let comments = row.append("td");
    //from the data.js data set the text of each table cell in the row from the corresponding data cell
    date.text(item.datetime)
    city.text(item.city);
    state.text(item.state);
    country.text(item.country);
    shape.text(item.shape);
    duration.text(item.duration);
    comments.text(item.comments);

});
}

function runFilter() {
  //prevent refresh using d3.event
  d3.event.preventDefault();

  //use d3 select to update datetime input from user input in "Enter a Date" entry
  const inputselect = d3.select("#datetime");
  //this is the value from the user input
  const inputVal = inputselect.property("value");
  //initialize newInfo variable and have it change according to input val filters
  let newInfo = info;

  //search through date/time column of table to find rows that match user input.
  if (inputVal) {
    //according to the inputVal given by the user
    //update newInfo, the table parameter by selecting only when the given date time equals the cell value
    newInfo = newInfo.filter(item => item.datetime === inputVal);
  }

  //use new info from filter if any to rebuild table according to that date
  createTable(newInfo);
}

// filter button is what runs the event to filter the table
d3.selectAll("#filter-btn").on("click", runFilter);

//on reload of table, create table with var info
createTable(info);
