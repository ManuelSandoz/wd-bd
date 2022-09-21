/*
// File name: profile.functions.js
// File date: 9/21/22
// Programmer: Manuel Sandoz Santiago
// Description: <<missing>>
*/

// Code to activate the tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))