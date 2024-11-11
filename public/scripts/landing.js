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