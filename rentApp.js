let pages = ["proInfo", "purchInfo", "rentInfo", "results"];
let nextButton, backButton, pdfButton, currentP, proBar, pdfFrame, downTrigger;
let reptitle, proAddress, proCity, proProvince, proAnnualTaxes;
let purchPrice, aftRepValue, purchCloseCost, estRepCost, downPercent, loanRate, amortYears, totalProCost, downPay, loanAmount;
let grossMonthRent, otherMonthIn, electrExp, waterNSewExp, garbageExp, condoFeeExp, monthInsurExp, monthOtherExp, monthProTax, vacancyPer, repNMainPer, manageFee;
let monthPI, monthIn, monthCash, noi, cashROI, monthExp, proForma, totalCashNeed, capRate;
let purchNums = ["purchPrice", "aftRepValue", "purchCloseCost", "estRepCost", "downPercent", "loanRate", "amortYears"];
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

function resetInput(id) {
  document.getElementById(id).style.borderColor = "#D3D3D3";
}

Number.prototype.toLocaleFixed = function(n) {
    return this.toLocaleString(undefined, {
      minimumFractionDigits: n,
      maximumFractionDigits: n
    });
};


window.onload = function() {
  proBar = document.getElementById('progressBar');
  nextButton = document.getElementById('nextB');
  backButton = document.getElementById('backB');
  pdfButton = document.getElementById('pdfButton');
  pdfFrame = document.getElementById('pdfFrame');
  downTrigger = document.getElementById('downTrigger');
  changePage("proInfo");
  backButton.style.display = "none";
  pdfButton.style.display = "none";
  pdfFrame.style.display = "none";
  var currentRed = "proAnnualTaxes";

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
        resetInput(currentRed);
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
      amortYears = +document.getElementById("amortYears").value;

      var wrongInput = false;
      for (var i = 0; i < purchNums.length; i++) {
        if (isNaN(+document.getElementById(purchNums[i]).value)) {
          wrongInput = true;
          currentRed = purchNums[i];
          document.getElementById(purchNums[i]).style.borderColor = "red";
          break;
        }
      }
      if (!wrongInput) {
        changePage("rentInfo");
        monthProTax = proAnnualTaxes / 12;
        document.getElementById("monthProTax").value = monthProTax.toFixed(2);
        resetInput(currentRed);
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
          currentRed = rentNums[i];
          document.getElementById(rentNums[i]).style.borderColor = "red";
          break;
        }
      }
      if (!wrongInput) {
        changePage("results");
        resetInput(currentRed);
        nextButton.style.display = "none";
        pdfButton.style.display = "inline-block";

        document.getElementById("resTitle").innerHTML = reptitle;
        document.getElementById("resAddress").innerHTML = proAddress + ", " + proCity + ", " + proProvince;
        document.getElementById("resPurchPrice").innerHTML = "$" + purchPrice.toLocaleString();
        document.getElementById("resPurchCloseCost").innerHTML = "$" + purchCloseCost.toLocaleFixed(2);
        document.getElementById("resEstRepCost").innerHTML = "$" + estRepCost.toLocaleFixed(2);
        totalProCost = (purchPrice+purchCloseCost+estRepCost);
        document.getElementById("resTotalProCost").innerHTML = "$" + totalProCost.toLocaleFixed(2);
        document.getElementById("resAftRepValue").innerHTML = "$" + aftRepValue.toLocaleFixed(2);
        downPay = (purchPrice * (downPercent/100));
        document.getElementById("resDownpay").innerHTML = "$" + downPay.toLocaleFixed(2);
        loanAmount = (purchPrice-downPay);
        document.getElementById("resLoanAmount").innerHTML = "$" + loanAmount.toLocaleFixed(2);
        document.getElementById("resAmortYears").innerHTML = amortYears + " years";
        document.getElementById("resLoanRate").innerHTML = loanRate.toLocaleFixed(2) + "%";
        let loanMonthRate = ((loanRate/100)/12);
        let monthNum = amortYears * 12;
        let toNegExp = Math.pow((loanMonthRate+1), (-monthNum));
        let oneMinusNegExp = 1 - toNegExp;
        monthPI = (loanMonthRate/oneMinusNegExp) * loanAmount;
        document.getElementById("resMonthPI").innerHTML = "$" + monthPI.toLocaleFixed(2);
        totalCashNeed = purchCloseCost + estRepCost + downPay;
        document.getElementById("restotalCashNeed").innerHTML = "$" + totalCashNeed.toLocaleFixed(2);
        monthIn = grossMonthRent+otherMonthIn;
        document.getElementById("resMonthIn").innerHTML = "$" + monthIn.toLocaleFixed(2);
        let fixedExp = electrExp + waterNSewExp + garbageExp + condoFeeExp + monthInsurExp + monthOtherExp + monthProTax;
        let varExp = ((vacancyPer/100) * grossMonthRent) + ((repNMainPer/100) * grossMonthRent) + ((manageFee/100) * grossMonthRent);
        monthExp = monthPI + fixedExp + varExp;
        document.getElementById("resMonthExp").innerHTML = "$" + monthExp.toLocaleFixed(2);
        monthCash = monthIn - monthExp;
        document.getElementById("resMonthCash").innerHTML = "$" + monthCash.toLocaleFixed(2);
        noi = (monthIn - monthExp + monthPI) * 12;
        document.getElementById("resNOI").innerHTML = "$" + noi.toLocaleFixed(2);
        proForma = (noi/aftRepValue)*100;
        document.getElementById("resProForma").innerHTML = proForma.toLocaleFixed(2) + "%";
        cashROI = ((monthCash * 12) / totalCashNeed) * 100;
        document.getElementById("resCashROI").innerHTML = cashROI.toLocaleFixed(2) + "%";
        capRate = (noi / purchPrice) * 100;
        document.getElementById("resCapRate").innerHTML = capRate.toLocaleFixed(2) + "%";
      }
    }
  }

  backButton.onclick = function() {
    if (currentP === "results") {
      changePage("rentInfo");
      nextButton.style.display = "inline-block";
      pdfButton.style.display = "none";
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

  pdfButton.onclick = function() {
    //pdfFrame.style.display = "inline-block";
    // create a document and pipe to a blob
    var doc = new PDFDocument();
    var stream = doc.pipe(blobStream());

    // draw some text
    doc.fontSize(24).fillColor("#004466").text(reptitle, 60, 60);
    doc.fontSize(14).font('Helvetica-Oblique').text((proAddress + ", " + proCity + ", " + proProvince), 70, 115);

    let labels = "Purchase Closing Costs \nEstimated Repairs \nTotal Project Cost \nAfter Repair Value \n\nDownpayment \nLoan Amount \nAmortized Over \nLoan Interest Rate \nMonthly P&I";
    let allCaps1 = "MONTHLY INCOME \nMONTHLY CASHFLOW \nNOI \nCASH ON CASH ROI";
    let allCaps2 = "MONTHLY EXPENSES \nPRO FORMA CAP \nTOTAL CASH NEEDED \nPURCHASE CAP RATE";
    let amounts1 = "$" + purchCloseCost.toLocaleFixed(2) + "\n$" + estRepCost.toLocaleFixed(2) + "\n$" + totalProCost.toLocaleFixed(2) + "\n$" + aftRepValue.toLocaleFixed(2)
      + "\n\n$" + downPay.toLocaleFixed(2) + "\n$" + loanAmount.toLocaleFixed(2) + "\n" + amortYears + " years\n" + loanRate.toLocaleFixed(2) + "%\n$" + monthPI.toLocaleFixed(2);
    let amounts2 = "$" + monthIn.toLocaleFixed(2) + "\n$" + monthCash.toLocaleFixed(2) + "\n$" + noi.toLocaleFixed(2) + "\n" + cashROI.toLocaleFixed(2) + "%";
    let amounts3 = "$" + monthExp.toLocaleFixed(2) + "\n" + proForma.toLocaleFixed(2) + "%\n$" + totalCashNeed.toLocaleFixed(2) + "\n" + capRate.toLocaleFixed(2) + "%";

    doc.font('Helvetica', 9).fillColor("#707070").lineGap(3).text(labels, 70, 220);
    doc.text('PURCHASE PRICE', 70, 190);
    doc.lineGap(50).text(allCaps1, 300, 190);
    doc.text(allCaps2, 430, 190);

    doc.fillColor('#383838').lineGap(3);
    doc.text(amounts1, 180, 220, {
      width: 70,
      align: 'right'
    });

    doc.fontSize(12).text(("$" + purchPrice.toLocaleFixed(2)), 70, 175);
    doc.lineGap(47).text(amounts2, 300, 175);
    doc.lineGap(47).text(amounts3, 430, 175);

    // end and display the document in the iframe to the right
    doc.end();
    stream.on('finish', function() {
      let blob = stream.toBlob('application/pdf');
      let url = window.URL.createObjectURL(blob);
      downTrigger.href = url;
      downTrigger.download = reptitle + ".pdf";
      downTrigger.click();
      window.URL.revokeObjectURL(url);
      //pdfFrame.src = stream.toBlobURL('application/pdf');
    });
  }

};
