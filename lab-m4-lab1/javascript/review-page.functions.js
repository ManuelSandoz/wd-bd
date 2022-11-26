/*
// File name: review-page.fucntions.js
// File date: 9/21/22
// Programmer: Manuel Sandoz Santiago
// Description: This file contains the functions to be used on the coffee review page.
// Last update: 10/16/22
*/

"use strict"

// Code to activate the tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// This function is used to display the uploaded picture by the user
var loadImg = function (event) {
  var image = document.getElementById('f-review-img');
  image.srcset = URL.createObjectURL(event.target.files[0]);
}

// This funciton saves the form data in local storage
function saveChanges() {
  //This line retreives all the inputs from the form in an array form.
  const inputs = document.querySelectorAll('#coffee-review  textarea, select option:checked, input[name="f-size-option"]:checked, input[type="text"], input[type="email"], input[type="datetime-local"], input[type="file"], input[type="checkbox"]:checked');

  // Taking each element in the input array and saving them in the local storage.
  //This uses the elements id as the key value.
  try {
    inputs.forEach(input => { // < possibly validate to prevent saving empty data
      localStorage.setItem(input.id, input.value);
    });

    alert('Data saved sucessfully')

  } catch (e) {
    alert('There was an error saving the data. \n Please try again')
  }
}

// This function will use regex to validate the email input
function validateEmail() {
  var regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  var email = document.getElementById('f-email');

  if (!regex.test(email.value)) {
    alert('Please enter a valid email address');

    return false;
  }
  return true;
}

// Function validates that the name and lastname inputs are filled
function validateFullName() {
  var name = document.getElementById('f-name');
  var lastName = document.getElementById('f-last-name');

  if(name.value === '') {
    alert('Please enter a valid name and try agian')

    return false;
  }

  if(lastName.value === '') {
    alert('Please enter a valid last name and try again')

    return false;
  }
  return true;
}

// Function that validates if a drink has been selected
function validateDrink() {
  var selectedDrink = document.querySelector('select option:checked');

  if(selectedDrink.value === '') {
    alert('Please choose a drink to review and try again')

    return false;
  }
  return true;
}

// Validate if a drink size has been chosen
function validateDrinkSize() {
  var drinkSize = document.getElementsByName('f-size-option');
  var flag = false;

  drinkSize.forEach(drink => {
    if (drink.checked) {
      flag = true;
    }
  })

  // If there are no checked elements activate the alert
  if (!flag) {
    alert('Please select a drink size and try again')

    return false;
  }
  return true;
}

// Validates if there is text in the review text area
function validateReview() {
  var reviewText = document.getElementById('f-review');

  if (reviewText.value === '') {
    alert('Plase enter your review and try again');

    return false;
  }
  return true;
}

// Validate if the term and conditions are checked
function validateAgreement() {
  var agreement = document.getElementById('f-legal-agree');
  let testing = agreement.checked;
  if(!agreement.checked){
    alert('You must agree to the terms and conditions in order to continue');

    return false;
  }
  return true;
}

// This function will validate through the inputs on the form
function validateForm() {

  var validationSuccess = true;
  
  // Validating if name and last name field are not empty
  if (!validateFullName()) {
    validationSuccess = false;
  }

  //validate
  if (!validateEmail()) {
    validationSuccess = false;
  }

  // Validating if a drink has been selected
  if (!validateDrink()) {
    validationSuccess = false;
  }

  // Validating the drink size selections
  if (!validateDrinkSize()) {
    validationSuccess = false;
  }

  // Validate if there is a review text
  if (!validateReview()) {
    validationSuccess = false;
  }

  // Validate if the agreement has been checkeda
  if (!validateAgreement()) {
    validationSuccess = false;
  }

  if (validationSuccess) {
    alert('Validation successful');
    return true;
  }
  return false;
}

function php_insert(){
  // First validate the form
  // If there is valid data proceed to create FormData object
  if (validateForm()) {
    let reviewData = new FormData();

    let drinkSize;
    document.getElementsByName('f-size-option').forEach(drink => {
      if(drink.checked){
        drinkSize = drink.value;
      }
    });
  
    let agreement = document.getElementById('f-legal-agree').checked ? 1 : 0;

    // Saving values on FormData object
    reviewData.append('firstName', document.getElementById('f-name'));
    reviewData.append('lastName', document.getElementById('f-last-name').value);
    reviewData.append('email', document.getElementById('f-email').value);
    reviewData.append('drink', document.querySelector('select option:checked').value);
    reviewData.append('drinkSize', drinkSize);
    reviewData.append('review', document.getElementById('f-review').value);
    reviewData.append('agreement', agreement);

    // AJAX call
    var packet = new XMLHttpRequest();

    // Open the object
    packet.open('POST', '../php/brew_review-insert.php');

    packet.onload = function() {
      console.log('This response', this.response);
      
      let insertResponse = this.response;
      if(insertResponse == true) {
        
        alert('insert succesful');
      }
      else {
        alert('insert failed');
      }
    }
    // Finally send the data
    packet.send(reviewData);

  } 
  else { 

    alert('There was an error saving the data on the server');
    return;
  }
}


// TODO
// 3. Replace all alerts with custom messages