function plusOne() {
  // Evaluate if the values exist and if it doesnt create it
  localStorage.count 
  ? localStorage.count++ 
  : localStorage.count = 1;

  // Display the number
  document.getElementById("count").innerHTML = localStorage.count
}

function resetCount() {
  localStorage.count=0

  document.getElementById("count").innerHTML = localStorage.count
}
