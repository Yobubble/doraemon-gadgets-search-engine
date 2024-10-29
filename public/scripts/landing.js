document.querySelector(".search-button").addEventListener("click", function () {
  const searchMessage = document.querySelector(".searchBox").value;
  console.log("Search term:", searchMessage);

  if (searchMessage == "") {
    alert("Please enter term in the search box :)");
  } else {
    window.location.href = `search.html?query=${encodeURIComponent(
      searchMessage
    )}`;
  }
});
