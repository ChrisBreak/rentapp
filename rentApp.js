let pages = ["proInfo", "purchInfo", "rentInfo", "results"];
let nextButton, backButton, currentP;

function changePage(page) {
  for(var i = 0; i < pages.length; i++) {
    document.getElementById(pages[i]).style.display = "none";
  }
  document.getElementById(page).style.display = "block";
  currentP = page;
}


window.onload = function() {
  nextButton = document.getElementById('nextB');
  backButton = document.getElementById('backB');
  changePage("proInfo");
  backButton.style.display = "none";

  nextButton.onclick = function() {
    if (currentP === "proInfo") {
      changePage("purchInfo");
      backButton.style.display = "inline-block";
    }
    else if (currentP === "purchInfo") {
      changePage("rentInfo");
    }
    else if (currentP === "rentInfo") {
      changePage("results");
      nextButton.style.display = "none";
    }
  }

  backButton.onclick = function() {
    if (currentP === "results") {
      changePage("rentInfo");
      nextButton.style.display = "inline-block";
    }
    else if (currentP === "rentInfo") {
      changePage("purchInfo");
    }
    else if (currentP === "purchInfo") {
      changePage("proInfo");
      backButton.style.display = "none";
    }
  }

};
