/*
// File name: review-page.fucntions.js
// File date: 9/21/22
// Programmer: Manuel Sandoz Santiago
// Description: This file contains the functions to be used on the coffee review page.
// Last update: 12/10/22
*/

"use strict"

// Code to activate the tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// This function is used to display the uploaded picture by the user
var loadImg = function (event) {
  var image = document.getElementById('f-review-img');
  image.srcset = URL.createObjectURL(event.target.files[0]);
};

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

    modalSuccess('Review saved sucessfully')

  } catch (e) {
    modalError('There was an error saving the data. \n Please try again')
  }
}

// This function will use regex to validate the email input
function validateEmail() {
  var regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  var email = document.getElementById('f-email');

  if (!regex.test(email.value)) {
    // modalError('Please enter a valid email address');

    return false;
  }
  return true;
}

// Function validates that the name and lastname inputs are filled
function validateFullName() {
  var name = document.getElementById('f-name');
  var lastName = document.getElementById('f-last-name');

  if(name.value === '') {
    // modalError('Please enter a valid name and try agian')

    return false;
  }

  if(lastName.value === '') {
    // modalError('Please enter a valid last name and try again')

    return false;
  }
  return true;
}

// Function that validates if a drink has been selected
function validateDrink() {
  var selectedDrink = document.querySelector('select option:checked');

  if(selectedDrink.value === '') {
    // modalError('Please choose a drink to review and try again')

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
    // modalError('Please select a drink size and try again')

    return false;
  }
  return true;
}

// Validates if there is text in the review text area
function validateReview() {
  var reviewText = document.getElementById('f-review');

  if (reviewText.value === '') {
    // modalError('Plase enter your review and try again');

    return false;
  }
  return true;
}

// Validate if the term and conditions are checked
function validateAgreement() {
  var agreement = document.getElementById('f-legal-agree');
  if(!agreement.checked){
    // modalError('You must agree to the terms and conditions in order to continue');

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
    modalSuccess('Data validation successful.');
    return true;
  }

  modalError('Make sure the information provided is correct and try again')
  return false;
}

function php_insert() {
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

    let filepath = document.getElementById('f-file-up').value;
    let image = filepath.replace(/.*[\/\\]/, '');
  
    // Saving values on FormData object
    reviewData.append('firstName', document.getElementById('f-name').value);
    reviewData.append('lastName', document.getElementById('f-last-name').value);
    reviewData.append('email', document.getElementById('f-email').value);
    reviewData.append('drink', document.querySelector('select option:checked').value);
    reviewData.append('drinkSize', drinkSize);
    reviewData.append('review', document.getElementById('f-review').value);
    reviewData.append('visitDate', document.getElementById('f-datetime').value);
    reviewData.append('picture', image);
    reviewData.append('agreement', agreement);

    // AJAX call
    var packet = new XMLHttpRequest();

    // Open the object
    packet.open('POST', '../php/review-page.insert.php');

    packet.onload = function() {
      console.log('Insert response (', this.response, ')');
      
      if(this.response) {
        modalSuccess('Review insert succesful');
        clearForm();
      }
      else {
        modalError('Review insert failed');
      }
    }
    // Finally send the data
    packet.send(reviewData);

  } 
  else { 
    modalError('Error saving the data on the server'); // <--- This message is overriding the one on validation
  }
}

function php_update() {

  if (validateForm()) {
    let reviewData = new FormData();

    let drinkSize;
    document.getElementsByName('f-size-option').forEach(drink => {
      if(drink.checked){
        drinkSize = drink.value;
      }
    });
  
    let agreement = document.getElementById('f-legal-agree').checked ? 1 : 0;

    let filepath = document.getElementById('f-file-up').value;
    let image = filepath.replace(/.*[\/\\]/, '');
    image = image == 'upload-placeholder.png' ? '' : image;
  
    // Saving values on FormData object
    reviewData.append('firstName', document.getElementById('f-name').value);
    reviewData.append('lastName', document.getElementById('f-last-name').value);
    reviewData.append('email', document.getElementById('f-email').value);
    reviewData.append('drink', document.querySelector('select option:checked').value);
    reviewData.append('drinkSize', drinkSize);
    reviewData.append('review', document.getElementById('f-review').value);
    reviewData.append('visitDate', document.getElementById('f-datetime').value);
    reviewData.append('picture', image);
    reviewData.append('agreement', agreement);
  
    let packet = new XMLHttpRequest();

    packet.open('POST', '../php/review-page.update.php');

    packet.onload = function() {
      console.log('Update response : ', this.response);

      
      if (this.response == true) {
        modalSuccess('Review updated successful.');
        clearForm();
      }
      else {
        modalError('Review update failed');
      }
    };
    
    packet.send(reviewData);
  }
  else {
    modalError('There was a problem updating the review data')
  }
}

function php_delete() {
  if (validateFullName()) {
    
    let reviewData = new FormData();

    reviewData.append('firstName', document.getElementById('f-name').value);
    reviewData.append('lastName', document.getElementById('f-last-name').value);

    let packet = new XMLHttpRequest();

    packet.open('POST', '../php/review-page.delete.php');

    packet.onload = function() {
      console.log('Response: ', this.response)

      if (this.response) {
        clearForm();

        modalSuccess('Record deleted successfully');
      }
      else {
        modalError('Error deleting the record');
      }
    }

    packet.send(reviewData);

  } 
  else {
    modalError('Error deleting the data');
  }
}

function php_select() {
  if (validateFullName()) {
    let reviewData = new FormData();

    reviewData.append('firstName', document.getElementById('f-name').value);
    reviewData.append('lastName', document.getElementById('f-last-name').value);

    let packet = new XMLHttpRequest();
    packet.open('POSt', '../php/review-page.select.php');

    packet.onload = function () {
      console.log('Select response ( ' + this.response + ' )');
      
      if (this.response != false) {
        
        const searchResult = JSON.parse(this.response)

        document.getElementById('f-name').value = searchResult['firstName'];
        document.getElementById('f-last-name').value = searchResult['lastName'];
        document.getElementById('f-email').value = searchResult['email'];
        document.getElementById('f-review').value = searchResult['review'];
        document.getElementById('f-datetime').value = searchResult['visitDate'];
        document.getElementById('f-legal-agree').checked = true;

        if (searchResult['picture'] == '') {
          document.getElementById('f-review-img').srcset = '../images/upload-placeholder.png';
        }
        else {
          document.getElementById('f-review-img').srcset = '../images/' + searchResult['picture'];

        }

        let drinks = document.getElementById("f-select").options;
        for (let i = 0; i < drinks.length; i++) {
          if (drinks[i].value == searchResult['drink']) {
            drinks[i].selected = true;
            break;
          }
        }

        
        let sizes = document.getElementsByName("f-size-option");
        for (let i = 0; i < sizes.length; i++) {
          if (sizes[i].value == searchResult['size']){
            sizes[i].checked = true; 
            break;
          }
        }

        modalSuccess('Review found successfully');

      }
      else {
        modalError('Review was not found');
        clearForm();
      }
    };

    packet.send(reviewData);
  }
  else {
    modalError('Error selecting the data');
  }
}

function clearForm () {
  document.getElementById('coffee-review').reset();
  document.getElementById('f-review-img').srcset = '';
}

// Javascrip for the focus modal
// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })

function modalSuccess (message) {
  document.getElementById('staticBackdropLabel').innerHTML = "Success!";
  document.getElementById('modal--body-mssg').innerHTML = message;

  $('#staticBackdrop').modal('show');
  $('#modal--footer-container').hide();
  $('#modal--header').removeClass('bg-danger gradient');
  $('#modal--header').removeClass('bg-warning gradient');
  $('#modal--header').addClass('text-white');
  $('#modal--header').css('background-color', '#A8BDB2');
}

function modalWarning (message) {
  document.getElementById('staticBackdropLabel').innerHTML = "Warning!";
  document.getElementById('modal--body-mssg').innerHTML = message;

  
  $('#staticBackdrop').modal('show');
  $('#modal--footer-container').show();
  $('#modal--header').removeClass('bg-danger gradient');
  $('#modal--header').addClass('bg-warning gradient text-white');
}

function modalError(message) {
  document.getElementById('staticBackdropLabel').innerHTML = "Error!";
  document.getElementById('modal--body-mssg').innerHTML = message;

  
  $('#staticBackdrop').modal('show');
  $('#modal--footer-container').hide();
  $('#modal--header').removeClass('bg-warning gradient');
  $('#modal--header').addClass('bg-danger gradient text-white')
}

// TODO
// 3. Replace all alerts with custom messages