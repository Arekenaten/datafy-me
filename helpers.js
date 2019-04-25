// A file for exposing useful things to the server process
const fs = require('fs');

exports.siteName = "Chase Miller Web Dev";

exports.menu = [
  { slug: '/', title: 'Home', active: false },
  { slug: '/about', title: 'About Me', active: false },
  { slug: '/works', title: 'My Work', active: false },
  { slug: '/myLifeInData', title: 'Capstone', active: false },
  { slug: '/resume', title: 'Resume', active: false },
  { slug: '/contact', title: 'Contact', active: false },
];