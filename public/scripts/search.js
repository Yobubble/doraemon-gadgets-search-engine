function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
console.log(getQueryParam("query"));

fetch("http://localhost:3000/api/queryMock", {
  // TODO: [BIGBEE]: Change API URL to "http://localhost:3000/api/query"
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

  items.forEach((item) => {
    const source = item._source || {};

    const proxyUrl = "";   // nothing use because of it don't work, so sad.
    // const proxyUrl = "";
    const imageUrl = `${proxyUrl}${source.image_url}`;
    console.log(imageUrl);
    const cardHTML = `
      <div class="search-result">
        <img src="${imageUrl}" alt="Gadget Image" />
        <div class="content">
          <a href=${imageUrl} target="_blank">
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
