// CSS
require('./src/css/main.css');
require('./src/css/animations.css');
require('./src/css/components.css');
require('./src/css/snackbar.css');
require('./src/css/header.css');
require('./src/css/loader.css');
require('./src/css/fileUpload.css');
require('./src/css/tagContent.css');
require('./src/css/states.css');

// JS
const globals = require('./src/scripts/globals');
const polyfills = require('./src/scripts/polyfills');
const checks = require('./src/scripts/checks');
const fileUpload = require('./src/scripts/fileUpload');
const events = require('./src/scripts/events');

// Setup
window.onload = function() {
  // Checking for IE
  checks.checkIEWarnings();
  
  // Web storage check
  checks.checkSessionStorage();
  checks.checkLocalStorage();

  //Registering file upload and tag events
  events.registerEvents();
  document.getElementById("file").addEventListener('change', fileUpload.readFile, false);
}

// Exports accessible from library
exports.goToSection = events.goToSection;