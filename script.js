document.getElementById("heartForm").addEventListener("submit", async function(e) {
  e.preventDefault();

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

  const res = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  document.getElementById("result").innerText = result.prediction;
});