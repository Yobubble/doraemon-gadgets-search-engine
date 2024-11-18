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
    populateCards(data.data, getQueryParam("query"));
  })
  .catch((error) => console.error("Error fetching data:", error));

  function populateCards(items, queryMessage) {
    const container = document.querySelector(".returned-card");
    container.innerHTML = ""; // Clear existing content
  
    console.log("There are " + items.length + " result(s) returned.");
    console.log(items);

    if(items.length == 0){
      container.innerHTML = `<br><br><br><br><br><h2>No results found.</h2>`
    }

    else{
    function highlightText(text) {
      if (!queryMessage) return text;
      const regex = new RegExp(`(${queryMessage})`, "gi");
      return text.replace(regex, '<span class="highlight">$1</span>');
    }
  
    items.forEach((item) => {
      const source = item._source || {};
      const highlightedDescription = highlightText(source.description);
      const highlightedAppearsIn = source.appears_in
      .map((appear) => highlightText(appear))
      .join(", ");
      
      const cardHTML = `
        <div class="search-result">
          <div class="content">
            <a href="https://doraemon.fandom.com/wiki/File:${source.image_url}" target="_blank">
            <p class="title" style="display: inline">${source.eng_name}</p>
            <p class="title" style="display: inline"> / ${source.jp_name}</p>
            </a>
            <p class="description">${highlightedDescription}</p>
            <p class="episode"><b>Appears In:</b> ${highlightedAppearsIn}</p>
          </div>
        </div>
      `;
  
      container.innerHTML += cardHTML;
    });
    }
  }

document.querySelector('.checkHighlight').addEventListener('change', function() {
  const highlights = document.querySelectorAll('.highlight');
  
  const isChecked = this.checked;

  highlights.forEach((highlight) => {
    if (isChecked) {
      highlight.style.backgroundColor = 'yellow'; 
    } else {
      highlight.style.backgroundColor = 'white'; 
    }
  });
});