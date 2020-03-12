let pages = ["proInfo", "purchInfo", "rentInfo", "results"];
let nextButton, backButton, currentP, proBar;

function changePage(page) {
  for(var i = 0; i < pages.length; i++) {
    document.getElementById(pages[i]).style.display = "none";
  }
  document.getElementById(page).style.display = "block";
  currentP = page;
  document.getElementById(page+"Bar").style.color = "#28a745";
  if (page === "proInfo") proBar.value = 14;
  else if (page === "purchInfo") proBar.value = 42;
  else if (page === "rentInfo") proBar.value = 70;
  else proBar.value = 100;
}


window.onload = function() {
  proBar = document.getElementById('progressBar');
  nextButton = document.getElementById('nextB');
  backButton = document.getElementById('backB');
  changePage("proInfo");
  backButton.style.display = "none";

  nextButton.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentP === "results") {
      changePage("rentInfo");
      nextButton.style.display = "inline-block";
      document.getElementById("resultsBar").style.color = "#696969";
    }
    else if (currentP === "rentInfo") {
      changePage("purchInfo");
      document.getElementById("rentInfoBar").style.color = "#696969";
    }
    else if (currentP === "purchInfo") {
      changePage("proInfo");
      backButton.style.display = "none";
      document.getElementById("purchInfoBar").style.color = "#696969";
    }
  }

};
