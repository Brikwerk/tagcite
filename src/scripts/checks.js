/**
 * Checks for IE.
 * @returns True (for IE detected) or False (IE not detected)
 */
function checkForIE() {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');
  const trident = ua.indexOf('Trident/');
  const edge = ua.indexOf('Edge/');

  if (msie > 0 || trident > 0 || edge > 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * Enables IE warnings if user is using IE.
 */
function checkIEWarnings() {
  if (checkForIE()) {
    let elms = document.getElementsByClassName("enable-on-ie");
    for (let i = 0; i < elms.length; i++) {
      elms[i].style.display = "block";
    }
  }
}

/**
 * Checks if Web Storage is available and notifies the user, if not.
 */
function checkSessionStorage() {
  try {
    let key = "HORRIBLY_LONG_KEY_THAT_WOULDNT_BE_USED"
    window.sessionStorage.setItem(key, key);
    window.sessionStorage.removeItem(key);
  } catch (e) {
    let msg = document.getElementById("session-storage-error");
    let fileupload = document.getElementById("fileupload");
    msg.style.display = "block";
    fileupload.style.display = "none";
  }
}

/**
 * Checks if Web Storage is available and notifies the user, if not.
 */
function checkLocalStorage() {
  try {
    let key = "HORRIBLY_LONG_KEY_THAT_WOULDNT_BE_USED"
    window.localStorage.setItem(key);
    window.localStorage.removeItem(key);
  } catch (e) {
    console.log("Local Storage not available");
  }
}

exports.checkForIE = checkForIE;
exports.checkIEWarnings = checkIEWarnings;
exports.checkSessionStorage = checkSessionStorage;
exports.checkLocalStorage = checkLocalStorage;
