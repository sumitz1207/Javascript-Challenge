//this is the data from data.js
var info = data;

//get table body info from data.js to create table on index page
var table_ref = d3.select("tbody");

function createTable(data) {
  table_ref.html("");

  //For loop through the data
  // and append on row each of the table columns, set text for each cell from data.js
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

//all of the entries according to user input (date, country, state, shape etc)
var entry_list = {};
//function that runs update using given user input values to filter the table
function runUpdate() {
  //select values from given user input and add the id and values to the entry list according to user entries
  if (d3.select(this).select("input").property("value")) {
    entry_list[d3.select(this).select("input").attr("id")] = d3.select(this).select("input").property("value");
  }
  else {
    delete entry_list[d3.select(this).select("input").attr("id")];
  }

  //initialize newInfo variable to original data, on which to filter according the user entries
  let newInfo = info;

  //for new table info, update using filtered data by matching with given values for each key value within the entry list
  Object.entries(entry_list).forEach(([k, v]) => {newInfo = newInfo.filter(row => row[k] === v);});

  //use new info from filter if any to rebuild table according to that date
  createTable(newInfo);

}

// filter is what runs the event to update filter the table
d3.selectAll(".filter").on("change", runUpdate);

//on reload of table, create table with var info
createTable(info);
