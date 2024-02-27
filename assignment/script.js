let searchInput = document.getElementById("search");
let container = document.getElementById("data-container");

const filterSearch = (datas) => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredDatas = datas.filter((data) =>
    data.symbol.toLowerCase().includes(searchValue)
  );
  displayData(filteredDatas);
};
const displayData = (data) => {
  container.innerHTML = "";
  // iterate each todo in todos using for...let...of loop
  for (let idx in data) {
    const row = document.createElement("div");
    row.classList.add("data-row");

    // FIRST COLUMN: INDEX
    const index = document.createElement("div");
    index.textContent = +idx + 1;
    index.classList.add("row-index");
    row.appendChild(index);

    // SECOND COLUMN: SYMBOL
    const symbol = document.createElement("div");
    symbol.textContent = data[idx].symbol;
    symbol.classList.add("row-symbol");
    row.appendChild(symbol);

    // THIRD COLUMN: MARK_PRICE
    const markPrice = document.createElement("div");
    markPrice.textContent = data[idx].markPrice;
    markPrice.classList.add("row-mark-price");
    row.appendChild(markPrice);

    // FOURTH COLUMN: FUNDING_RATE
    const fundingRate = document.createElement("div");
    fundingRate.textContent = data[idx].lastFundingRate;
    fundingRate.classList.add("row-funding-rate");
    row.appendChild(fundingRate);

    container.appendChild(row);
  }
};

const fetchPremiumIndex = async () => {
  const res = await fetch("https://fapi.binance.com/fapi/v1/premiumIndex");
  const data = await res.json();
  data.sort(
    (a, b) => parseFloat(b.lastFundingRate) - parseFloat(a.lastFundingRate)
  );

  // Selecting the top 50 items
  //   const top50Items = data.slice(0, 50);
  //   console.log("top50Items", top50Items);

  searchInput.addEventListener("input", () => filterSearch(data));
  displayData(data);
};

fetchPremiumIndex();
