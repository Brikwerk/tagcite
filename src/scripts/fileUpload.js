const tagParse = require('./tagParse');
const globals = require('./globals');
const search = require('./search');

/**
 * Inits a counter that calls a function when finished.
 * @param {int} limit - Number of times before callback is called
 * @param {object} callback - Callback function
 */
function makeCounter(limit, callback) {
  return function () {
    if (--limit === 0) {
      callback();
    }
  }
}

/**
 * Event handler that reads and begins parsing dropped files.
 * @param {object} e - Drop event
 */
function readFile(e) {
  // Showing loader and hiding fileupload box
  document.getElementById("fileupload-container").classList.add("disabled");
  document.getElementById("main-loader").style.display = "table";

  let files = e.target.files
  let texts = [];
  let filenames = [];
  let done = makeCounter(files.length, function () {
    tagParse.parseText(texts, filenames);
    globals.tags = document.getElementsByClassName("tag");
    globals.tagContents = document.getElementsByClassName("tag-content");
    search.showSearchIcon();
  });

  for (let i = 0; i < files.length; i++) {
    let reader = new FileReader();
    reader.onload = function (event) {
      texts.push(event.target.result);
      done();
    }
    filenames.push(files[i].name);
    reader.readAsText(files[i])
  }
}

exports.readFile = readFile;
