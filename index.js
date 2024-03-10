// This file has been made with the assistance of ChatGPT-4
const XHR = new XMLHttpRequest()
const ENDPOINTROOT = 'https://leaf-special-network.glitch.me/';
const QUERY = "INSERT INTO patients(name, dateOfBirth) VALUES ('Sara Brown','1901-01-01'), ('Jack Ma', '1960-01-30'), ('John Smith', '1941-01-01'), ('Elon Musk', '1999-01-01')";

// Insert the data into the database
async function post() {
  XHR.open("POST", ENDPOINTROOT + "lab5/insert", true)
  XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  let jsonStr = JSON.stringify({
    query: QUERY
  })
  XHR.send(jsonStr)
  XHR.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
        this.responseText
    }
  }
}

// Get the data from the database
async function get() {
  const sqlQueries = document.getElementById('sqlQuery').value
  XHR.open("GET", ENDPOINTROOT + `lab5/select/${sqlQueries}`, true)
  XHR.send()
  XHR.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let json = JSON.parse(this.responseText)
      document.getElementById("demo").innerHTML =
        json.response
      document.getElementById("table").innerHTML =
        JSON.stringify(json.result)
    } else {
      document.getElementById("table").innerHTML =
        this.responseText
    }
  }
}

// Insert the data into the database
async function insert() {
  const sqlQueries = document.getElementById('sqlQuery').value
  XHR.open("POST", ENDPOINTROOT + "lab5/insert", true)
  XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  let jsonStr = JSON.stringify({
    query: sqlQueries
  })
  XHR.send(jsonStr)
  XHR.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
        this.responseText
    } else {
      document.getElementById("table").innerHTML =
        this.responseText
    }
  }
}

// Query the database
function query() {
  const sqlQueries = document.getElementById('sqlQuery').value.toString()
  if (sqlQueries.includes("SELECT") || sqlQueries.includes("select")) {
    get()
  }

  if (sqlQueries.includes("INSERT") || sqlQueries.includes("insert")) {
    insert()
  }

  else {
    document.getElementById("demo").innerHTML = "Invalid Query";
  }
}
