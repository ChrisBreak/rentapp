let pages = ["proInfo", "purchInfo", "rentInfo", "results"];
let nextButton, backButton, currentP, proBar;
let reptitle, proAddress, proCity, proProvince, proAnnualTaxes;
let purchPrice, aftRepValue, purchCloseCost, estRepCost, downPercent, loanRate, pointsLender, amortYears;
let grossMonthRent, otherMonthIn, electrExp, waterNSewExp, garbageExp, condoFeeExp, monthInsurExp, monthOtherExp, vacancyPer, repNMainPer, manageFee;
let purchNums = ["purchPrice", "aftRepValue", "purchCloseCost", "estRepCost", "downPercent", "loanRate", "pointsLender", "amortYears"];
let rentNums = ["grossMonthRent", "otherMonthIn", "electrExp", "waterNSewExp", "garbageExp", "condoFeeExp", "monthInsurExp", "monthOtherExp", "vacancyPer", "repNMainPer", "manageFee"];

function changePage(page) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  for(var i = 0; i < pages.length; i++) {
    document.getElementById(pages[i]).style.display = "none";
  }
  document.getElementById(page).style.display = "block";
  currentP = page;
  document.getElementById(page+"Bar").style.color = "#28a745";

  if (document.body.clientWidth > 580) {
    if (page === "proInfo") proBar.value = 22;
    else if (page === "purchInfo") proBar.value = 48;
    else if (page === "rentInfo") proBar.value = 72;
    else proBar.value = 100;
  }
  else {
    if (page === "proInfo") proBar.value = 14;
    else if (page === "purchInfo") proBar.value = 42;
    else if (page === "rentInfo") proBar.value = 70;
    else proBar.value = 100;
  }
}

function resetInput(input) {
  input.style.borderColor = "#D3D3D3";
}


window.onload = function() {
  proBar = document.getElementById('progressBar');
  nextButton = document.getElementById('nextB');
  backButton = document.getElementById('backB');
  changePage("proInfo");
  backButton.style.display = "none";

  nextButton.onclick = function() {
    if (currentP === "proInfo") {
      reptitle = document.getElementById("reptitle").value;
      proAddress = document.getElementById("proAddress").value;
      proCity = document.getElementById("proCity").value;
      proProvince = document.getElementById("proProvince").value;
      proAnnualTaxes = +document.getElementById("proAnnualTaxes").value;
      if (!isNaN(proAnnualTaxes)) {
        changePage("purchInfo");
        backButton.style.display = "inline-block";
      }
      else {
        document.getElementById("proAnnualTaxes").style.borderColor = "red";
      }
    }
    else if (currentP === "purchInfo") {
      purchPrice = +document.getElementById("purchPrice").value;
      aftRepValue = +document.getElementById("aftRepValue").value;
      purchCloseCost = +document.getElementById("purchCloseCost").value;
      estRepCost = +document.getElementById("estRepCost").value;
      downPercent = +document.getElementById("downPercent").value;
      loanRate = +document.getElementById("loanRate").value;
      pointsLender = +document.getElementById("pointsLender").value;
      amortYears = +document.getElementById("amortYears").value;

      var wrongInput = false;
      for (var i = 0; i < purchNums.length; i++) {
        if (isNaN(+document.getElementById(purchNums[i]).value)) {
          wrongInput = true;
          document.getElementById(purchNums[i]).style.borderColor = "red";
          break;
        }
      }
      if (!wrongInput) {
        changePage("rentInfo");
      }
    }
    else if (currentP === "rentInfo") {
      grossMonthRent = +document.getElementById("grossMonthRent").value;
      otherMonthIn = +document.getElementById("otherMonthIn").value;
      electrExp = +document.getElementById("electrExp").value;
      waterNSewExp = +document.getElementById("waterNSewExp").value;
      garbageExp = +document.getElementById("garbageExp").value;
      condoFeeExp = +document.getElementById("condoFeeExp").value;
      monthInsurExp = +document.getElementById("monthInsurExp").value;
      monthOtherExp = +document.getElementById("monthOtherExp").value;
      vacancyPer = +document.getElementById("vacancyPer").value;
      repNMainPer = +document.getElementById("repNMainPer").value;
      manageFee = +document.getElementById("manageFee").value;

      var wrongInput = false;
      for (var i = 0; i < rentNums.length; i++) {
        if (isNaN(+document.getElementById(rentNums[i]).value)) {
          wrongInput = true;
          document.getElementById(rentNums[i]).style.borderColor = "red";
          break;
        }
      }
      if (!wrongInput) {
        changePage("results");
        nextButton.style.display = "none";
      }
    }
  }

  backButton.onclick = function() {
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
