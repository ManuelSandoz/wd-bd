/*
// File name: profile.functions.js
// File date: 9/21/22
// Programmer: Manuel Sandoz Santiago
// Description: <<missing>>
*/

"use strict";

// Code to activate the tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// This function is used to display the uploaded picture of the user
var loadImg = function (event) {
  var image = document.getElementById('review-img');
  image.srcset = URL.createObjectURL(event.target.files[0]);
}