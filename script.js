// Form and result box elements
const form = document.getElementById("heartForm");
const resultBox = document.getElementById("result");

/*
  Handle form submission
  - Prevent page reload
  - Collect input data
  - Send data to backend API
  - Show prediction result
*/
form.addEventListener("submit", async function(e) {

  e.preventDefault(); // stop page refresh on submit

  // Show loading text while waiting for response
  resultBox.innerHTML = "Checking Prediction...";

  // Collect all input values from form
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

    // Send POST request to backend prediction API
    const res = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // Convert response to JSON
    const result = await res.json();

    // Show prediction result on UI
    resultBox.innerHTML = result.prediction;

    // Change text color based on risk level
    if(result.prediction.toLowerCase().includes("risk")) {
      resultBox.style.color = "#ff4b5c"; // danger color
    }
    else {
      resultBox.style.color = "#4ade80"; // safe color
    }

  }

  catch(error) {

    // Show error if backend fails or request breaks
    resultBox.innerHTML = "Server Error!";
    resultBox.style.color = "orange";

  }

});


/*
  Theme toggle button
  - Switch between light and dark mode
  - Change icon dynamically
*/
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  // Change icon based on current theme
  if(document.body.classList.contains("light-mode")) {
    themeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }
  else {
    themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }

});