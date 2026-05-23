const form = document.getElementById("heartForm");
const resultBox = document.getElementById("result");

form.addEventListener("submit", async function(e) {

  e.preventDefault();

  resultBox.innerHTML = "Checking Prediction...";

  const data = {
    age: +document.getElementById("age").value,
    bp: +document.getElementById("bp").value,
    cholesterol: +document.getElementById("cholesterol").value,
    maxHr: +document.getElementById("maxHr").value,
    oldpeak: +document.getElementById("oldpeak").value,
    fbs: +document.getElementById("fbs").value,
    cp: +document.getElementById("cp").value,
    exang: +document.getElementById("exang").value
  };

  try {

    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    resultBox.innerHTML = result.prediction;

    if(result.prediction.toLowerCase().includes("risk")) {
      resultBox.style.color = "#ff4b5c";
    }
    else {
      resultBox.style.color = "#4ade80";
    }

  }

  catch(error) {

    resultBox.innerHTML = "Server Error!";
    resultBox.style.color = "orange";

  }

});


const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  if(document.body.classList.contains("light-mode")) {
    themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }
  else {
    themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }

});