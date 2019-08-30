/**
 * Displays and throws error.
 * @param {object} e - Error
 */
function displayError(e) {
  // Hiding loader
  loader = document.getElementById("main-loader");
  loader.style.display = "none";
  // Inserting error at top of content
  fileUpload = document.getElementById("fileupload-container");
  errorElm = document.createElement("section");
  errorElm.innerHTML = "<strong class='inline-tag error-tag'>ERROR:</strong> " + e.name + ": " + e.message
  errorElm.classList.add("message-container");
  document.body.insertBefore(errorElm, fileUpload);
  // Displaying error in console
  console.log(e.name, e.stack);
  throw e;
}

/**
 * Injects a loader into the specified element.
 * @param {object} element - HTML element a loader will be injected into
 */
function injectLoader(element) {
  element.innerHTML = "<div class='loader-container'>\
    <div class='loader-content'>\
      <div class='loader-spinner'></div>\
      <span class='loader-text'>Loading...</span>\
    </div>\
  </div>"
}

/**
 * Checks if a property exists in a JSON object. If not, it is created.
 * @param {object} object - JSON object
 * @param {string} property - JSON object key
 */
function ensurePropertyExists(object, property, value) {
  if (typeof object[property] === "undefined") {
    object[property] = value;
  }
}

/**
 * Saves a JSON object containing tags and tag data to the session.
 */
function saveTagsToSession(datastore) {
  sessionStorage.setItem("tags",JSON.stringify(datastore));
}

/**
 * Retreives a JSON object containing tags and tag data from the session.
 */
function getTagsFromSession() {
  return JSON.parse(sessionStorage.getItem("tags"));
}

exports.displayError = displayError;
exports.injectLoader = injectLoader;
exports.ensurePropertyExists = ensurePropertyExists;
exports.saveTagsToSession = saveTagsToSession;
exports.getTagsFromSession = getTagsFromSession;
