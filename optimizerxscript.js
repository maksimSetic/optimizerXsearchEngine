const endpoint = "https://api.npoint.io/cf5db5290dfcf4eca704";
const carsTableBody = document.querySelector("#carsTableBody");
const searchInput = document.querySelector("#searchInput");
const prevPageBtn = document.querySelector("#prevPageBtn");
const nextPageBtn = document.querySelector("#nextPageBtn");
const pageNumber = document.querySelector("#pageNumber");
const sortNameAscBtn = document.querySelector("#sortNameAscBtn");
const sortNameDescBtn = document.querySelector("#sortNameDescBtn");
const sortHorsepowerAscBtn = document.querySelector("#sortHorsepowerAscBtn");
const sortHorsepowerDescBtn = document.querySelector("#sortHorsepowerDescBtn");
const sortYearAscBtn = document.querySelector("#sortYearAscBtn");
const sortYearDescBtn = document.querySelector("#sortYearDescBtn");
let cars = [];
let filteredCars = [];
let currentPage = 1;
let itemsPerPage = 10;

fetch(endpoint)
  .then(res => res.json())
  .then(data => {
    cars = data;
    filteredCars = cars;
    renderTable();
  });

function renderTable() {
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let currentCars = filteredCars.slice(startIndex, endIndex);

  let tableRows = "";
  currentCars.forEach(car => {
    tableRows += `
      <tr>
        <td style="white-space: nowrap;" data-label="Name">${car.Name}</td>
        <td data-label="Horsepower">${car.Horsepower}</td>
        <td data-label="Acceleration">${car.Acceleration}</td>
        <td data-label="MPG">${car.Miles_per_Gallon}</td>
        <td data-label="Cylinders">${car.Cylinders}</td>
        <td data-label="Displacement">${car.Displacement}</td>
        <td data-label="Origin">${car.Origin}</td>
        <td data-label="Year">${car.Year}</td>
      </tr>
    `;
  });
  carsTableBody.innerHTML = tableRows;

  pageNumber.innerHTML = `${currentPage}`;
  prevPageBtn.style.visibility = currentPage === 1 ? "hidden" : "visible";
  nextPageBtn.style.visibility =
    currentPage === Math.ceil(filteredCars.length / itemsPerPage) ? "hidden" : "visible";
}

// Filter cars by name
searchInput.addEventListener("input", function() {
  let searchTerm = this.value.toLowerCase();
  filteredCars = cars.filter(car => car.Name.toLowerCase().includes(searchTerm));
  currentPage = 1;
  renderTable();
});

// Sort cars by name (ascending)
sortNameAscBtn.addEventListener("click", function() {
  filteredCars.sort((a, b) => (a.Name > b.Name ? 1 : -1));
  renderTable();
});

// Sort cars by name (descending)
sortNameDescBtn.addEventListener("click", function() {
  filteredCars.sort((a, b) => (a.Name < b.Name ? 1 : -1));
  renderTable();
});

// Sort cars by horsepower (ascending)
sortHorsepowerAscBtn.addEventListener("click", function() {
  filteredCars.sort((a, b) => a.Horsepower - b.Horsepower);
  renderTable();
});

// Sort cars by horsepower (descending)
sortHorsepowerDescBtn.addEventListener("click", function() {
  filteredCars.sort((a, b) => b.Horsepower - a.Horsepower);
  renderTable();
});

 // Sort cars by Year (ascending)
 sortYearAscBtn.addEventListener("click", function() {
  filteredCars.sort((a, b) => (a.Year > b.Year ? 1 : -1));
  renderTable();
});

  // Sort cars by Year (ascending)
  sortYearDescBtn.addEventListener("click", function() {
  filteredCars.sort((a, b) => (a.Year < b.Year ? 1 : -1));
  renderTable();
});

// Go to previous page
prevPageBtn.addEventListener("click", function() {
  currentPage--;
  renderTable();
});

// Go to next page
nextPageBtn.addEventListener("click", function() {
  currentPage++;
  renderTable();
});