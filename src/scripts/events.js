const constants = require('./constants');
const searchReq = require('./search');

/**
 * Toggles styling pertaining to an opened data title
 * @param {object} event - Event object
 */
function toggleSection(event) {
  elm = event.target;
  if (elm.hasAttribute("child")) {
    section = document.getElementById(elm.getAttribute("child"));
    if (section.style.display === "block") {
      section.style.display = "None";
      elm.classList.add("data-title-toggled")
    } else {
      section.style.display = "block";
      elm.classList.remove("data-title-toggled")
    }
  }
}

/**
 * Sets the page location to the clicked element based on the ID and type
 * @param {HTMLElement} elmName - The name representing the element
 * @param {string} type - A string reflecting the type of element
 */
function goToSection(elmName, type) {
  let elm = document.getElementById(elmName);
  // Ensure tag is visible
  elm.style.display = "block";
  if (type == "author") {
    // Setting tag header to opened
    let header = document.getElementById(elmName + constants.AUTHOR_SUFFIX)
    header.classList.add("tag-open")
    header.style.display = "";
    // Ensure author container is visiable and set location
    document.getElementById("author-container").style.display = "block";
    document.getElementById("data-authors-title").children[0].classList.remove("data-title-toggled")
    location.href = "#" + elmName + constants.AUTHOR_SUFFIX;
  } else {
    // Setting tag header to opened
    let header = document.getElementById(elmName + constants.TAG_SUFFIX)
    header.classList.add("tag-open")
    header.style.display = "";
    // Ensure tag container is visiable and set location
    document.getElementById("tag-container").style.display = "block";
    document.getElementById("data-tags-title").children[0].classList.remove("data-title-toggled")
    location.href = "#" + elmName + constants.TAG_SUFFIX;
  }
  // Scrolling more to offset stickied header
  window.scrollBy(0,-1.2*(document.getElementById("header").scrollHeight))
}

/**
 * Event handler for when a tag is clicked.
 * @param {object} event 
 */
function sectionClicked(event) {
  // Element ID of content should be the tag text
  let contentID = event.target.innerHTML;
  let contentElement = document.getElementById(contentID);
  // Toggle visibility state
  if (contentElement.style.display === "none" || contentElement.style.display === "") {
    // Toggle tag open state
    event.target.parentElement.classList.add("tag-open");
    contentElement.style.display = "block";
  } else {
    // Toggle tag close state
    event.target.parentElement.classList.remove("tag-open");
    contentElement.style.display = "none";
  }
}

/**
 * Event handler for when a tag is closed.
 * @param {object} event 
 */
function sectionClose(event) {
  // Closing content
  contentNodeID = event.target.getAttribute("content-node-id");
  element = document.getElementById(contentNodeID);
  element.style.display = "none";
  // Removing border from tag
  tagHeader = event.target.parentElement.previousElementSibling
  tagHeader.classList.remove("tag-open");
}

function searchOpen() {
  let search = document.getElementById("search-container");
  search.style.bottom = "initial";
  search.style.opacity = "1";
  search.style.zIndex = "10";
  let searchInput = document.getElementById("search-input");
  searchInput.focus();
}

function searchClose() {
  let search = document.getElementById("search-container");
  search.style.bottom = "";
  search.style.opacity = "0";
  search.style.zIndex = "-1";
  // Showing any hidden tags
  searchReq.showTags();
  // Clearing input value
  document.getElementById("search-input").value = "";
}

/**
 * Applies an event/callback function to all elements with a specified class
 * @param {string} className - The name of the class to apply the event to
 * @param {string} event - The event string (Eg: "click")
 * @param {function} callback - The function to be called on the event
 */
function applyEventToClass(className, event, callback) {
  let elms = document.getElementsByClassName(className);
  for (let i = 0; i < elms.length; i++) {
    elms[i].addEventListener(event, callback);
  }
}

/**
 * Applies an event/callback function to an element with a specified ID
 * @param {string} id - The id of the element
 * @param {string} event - The event string (Eg: "click")
 * @param {function} callback - The function to be called on the event
 */
function applyEventToID(id, event, callback) {
  let elm = document.getElementById(id);
  elm.addEventListener(event, callback);
}

/**
 * Registers events within TagCite
 */
function registerEvents() {
  // Registering section toggles
  applyEventToClass('data-header', 'click', toggleSection);
  applyEventToID("search-icon", "click", searchOpen);
  applyEventToID("close-icon", "click", searchClose);
  applyEventToID("search-input", "keyup", searchReq.startSearchTimer);
}

exports.toggleSection = toggleSection;
exports.sectionClicked = sectionClicked;
exports.sectionClose = sectionClose;
exports.registerEvents = registerEvents;
exports.goToSection = goToSection;
exports.searchClose = searchClose;
