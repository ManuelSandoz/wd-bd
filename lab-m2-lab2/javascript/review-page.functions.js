/*
// File name: review-page.fucntions.js
// File date: 9/21/22
// Programmer: Manuel Sandoz Santiago
// Description: This file contains the functions to be used on the coffee review page.
*/

"use strict"

// Code to activate the tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// This function is used to display the uploaded picture of the user
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
  }
}

// This function will make sure all requred inputs are filled
function validateFullName() {
  var name = document.getElementById('f-name');
  var lastName = document.getElementById('f-last-name');

  if(name.value === '') {
    alert('Please enter a valid name and try agian')
  }

  if(lastName.value === '') {
    alert('Please enter a valid last name and try again')
  }
}

// Function that validates if a drink has been selected
function validateDrink() {
  var selectedDrink = document.querySelector('select option:checked');

  if(selectedDrink.value === '') {
    alert('Please choose a drink to review and try again')
  }
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
  }
}

// Validates if there is text in the review text area
function validateReview() {
  var reviewText = document.getElementById('f-review');

  if (reviewText.value === '') {
    alert('Plase enter your review and try again');
  }
}

function validateAgreement() {
  var agreement = document.getElementById('f-legal-agree');
  
  if(!agreement.checked){
    alert('You must agree to the terms and conditions in order to continue')
  }
}

// This function will validate through the inputs on the form
function validateForm() {
  
  // Validating if name and last name field are not empty
  validateFullName();

  //validate
  validateEmail()

  // Validating if a drink has been selected
  validateDrink();

  // Validating the drink size selections
  validateDrinkSize();

  // Validate if there is a review text
  validateReview();

  // Validate if the agreement has been checkeda
  validateAgreement();
}