// Get query param into search box and prepare for fetch
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
console.log("Search Term: " + getQueryParam("query"));
document.querySelector('.searchBox').value = getQueryParam("query");

// Do the search
function doTheSearch(){
  const searchMessage = document.querySelector(".searchBox").value;
  console.log("Search term:", searchMessage);

  if (searchMessage == "") {
    alert("Please enter term in the search box :)");
  } else {
    window.location.href = `search.html?query=${encodeURIComponent(
      searchMessage
    )}`;
  }
}
document.querySelector(".search-button").addEventListener("click", function () {
  doTheSearch();
});
document.querySelector(".searchBox").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    doTheSearch();
  }
});

fetch("http://localhost:3000/api/query", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query_message: getQueryParam("query"),
  }),
})
  .then((response) => response.json())
  .then((data) => {
    populateCards(data.data);
  })
  .catch((error) => console.error("Error fetching data:", error));

function populateCards(items) {
  const container = document.querySelector(".returned-card");
  container.innerHTML = ""; // Clear existing content
  console.log(items);
  items.forEach((item) => {
    const source = item._source || {};
    console.log(source.image_url);
    const cardHTML = `
      <div class="search-result">
        <div class="content">
          <a href="https://doraemon.fandom.com/wiki/File:${source.image_url}" target="_blank">
          <p class="title" style="display: inline">${source.eng_name}</p>
          <p class="title" style="display: inline"> / ${source.jp_name}</p>
          </a>
          <p class="description">${source.description}</p>
          <p class="episode">Appears In: ${source.appears_in.join(", ")}</p>
        </div>
      </div>
    `;

    container.innerHTML += cardHTML;
  });
}
