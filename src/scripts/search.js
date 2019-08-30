const globals = require('./globals');
const events = require('./events');

// Recording last setInterval to search
let searchTimer = null;

function showSearchIcon() {
  document.getElementById("search-icon").style.display = "block";
}

function hideTags() {
  if (globals.tags == null) {return;}
  for (let i = 0; i < globals.tags.length; i++) {
    let elm = globals.tags[i]
    elm.classList.remove("tag-open");
    elm.style.display = "none";
  }
}

function hideTagContents() {
  if (globals.tagContents == null) {return;}
  for (let i = 0; i < globals.tagContents.length; i++) {
    let elm = globals.tagContents[i]
    elm.style.display = "none";
  }
}

function showTags() {
  if (globals.tags == null) {return;}
  for (let i = 0; i < globals.tags.length; i++) {
    let elm = globals.tags[i]
    elm.style.display = "";
  }
}

function searchTags() {
  if (globals.tags == null) {return;}
  // Getting phrase to search with
  searchPhrase = document.getElementById("search-input").value;
  // If the search phrase is blank and we've hidden the tags, show them
  if (searchPhrase === "") {
    showTags();
    return;
  }

  hideTags();
  hideTagContents();

  // Searching for desired tags and unhiding results
  var results = document.querySelectorAll('*[id*="' + searchPhrase + '"].tag-content');
  for (let i = 0; i < results.length; i++) {
    let elm = results[i];
    elm.previousSibling.style.display = "";
  }
}

function startSearchTimer(e) {
  // Cancel searching if the user presses esc
  if (e.keyCode === 27) {
    events.searchClose();
  }
  // Clear the previous timer if it's not null
  if (searchTimer !== null) {
    clearTimeout(searchTimer);
  }
  // Start a new timer
  searchTimer = setTimeout(searchTags, 250);
}

exports.startSearchTimer = startSearchTimer;
exports.showTags = showTags;
exports.showSearchIcon = showSearchIcon;