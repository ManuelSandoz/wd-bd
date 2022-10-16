/*
// File name: review-page.fucntions.js
// File date: 9/21/22
// Programmer: Manuel Sandoz Santiago
// Description: This file contains the functions to be used on the coffee review page.
*/

"use strict";

//THINGS TO DO FOR LAB
// Javascript Form Validation (Input Type Validation Functions)
// Javascript RegExp (Regular Expressions)
// HTML Web Storage API (LocalStorage)

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
  var regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
  var email = document.getElementById('f-email');

  return regex.test(email.value);
}

// This function will validate through the inputs on the form
function validateForm() {
  if (!validateEmail()) {
    alert('Please enter a valid email address')
  }
}