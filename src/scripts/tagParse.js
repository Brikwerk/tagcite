const utils = require('./utilities');
const tagRender = require('./tagRender');
const tagStats = require('./tagStats');

/**
 * Begins parsing of uploaded tagged documents.
 * @param {objects} texts - List of text files to parse
 * @param {object} filenames - List of filenames
 */
function parseText(texts, filenames) {
  try {
    // Showing loader and hiding fileuploader
    document.getElementById("fileupload-container").className += " disabled";
    // Parsing/Appending tags
    for (i = 0; i < texts.length; i++) {
      text = texts[i];
      parseTags(text);
    }
  } catch (e) {
    utils.displayError(e);
  }
}

/**
 * Parses sections into data from a raw string and renders data.
 * @param {string} raw - Raw text from the tagged text file
 */
function parseTags(raw) {
  // Filtering sections
  let text = raw.replace(/\r\n/g, '\n');
  // Removing any spaces in between section separators
  text = text.replace(/\n +\n/g, "\n\n");

  let datastore = {};
  text = text.split(/\n\n+/g).filter(Boolean);
  sections = text.filter(function(elm) {
    return elm.indexOf("#") !== -1
  })
  unfiledSections = text.filter(function(elm) {
    return elm.indexOf("#") === -1
  })

  // Filing sections
  for (let i = 0; i < sections.length; i++) {
    section = sections[i];
    // Getting the data from the section
    data = getData(section);
    // Rendering HTML section
    data["html"] = tagRender.renderData(data)
    // Storing data into datastore for later processing
    fileData(datastore, data);
  }
  // Filing sections with no tags
  for (let i = 0; i < unfiledSections.length; i++) {
    section = unfiledSections[i];
    // Getting the data from the section
    data = getData(section);
    // Rendering HTML section
    data["html"] = tagRender.renderData(data)
    // Storing data into datastore for later processing
    fileData(datastore, data);
  }

  // Calculates weights for tag sizing
  tagStats.getTagStats(datastore);
  // Calculates weights for author sizing, if there are authors
  if (datastore.hasOwnProperty("authors")) {
    if (Object.keys(datastore["authors"]).length > 0) {
      tagStats.getAuthorStats(datastore);
    }
  }
  // Saves datastore into the session storage for later (potential) processing
  utils.saveTagsToSession(datastore);
  // Renders tags to the HTML of the page
  tagRender.renderDatastore(datastore);
}

/**
 * Extracts tags, authors, and title from a section string.
 * @param {string} section - A tagged and titled section of text
 */
function getData(section) {
  /*  Matching terms based on spaces or special formatting
      The following tagcite formats are matched as a whole:
        [[Matched title with or without spaces goes here]]
      The above formats are matched with the following regex:
      \[\[([\s\S]*?)\]\]    : Matches the minimum amount of char between [[ and ]]
      |                     : or...
      [^\s]+                : 1 or more characters not a space
  */
  let terms = section.replace(/\n/g, " ").match(/\[\[([\s\S]*?)\]\]|[^\s]+/g);
  // Empty data container with defaults
  let data = {
    tags: [],
    title: "",
    authors: [],
    content: "Unspecified"
  }

  let contentEndIndex = 0;
  // Iterating backwards over terms in section
  // Looking for chars in terms that match, signifying a "special" term
  // Special term = Tag, author, title, etc
  // Stop when we encounter a non-special character
  // Non-special = term that doesn't contain any special chars
  for (let i = terms.length-1; i >= 0; i--) {
    let term = terms[i];
    if (typeof term === "string" && term.length > 0) {
      // Checking for a tag
      if (term[0] === "#") {
        data.tags.push(term.replace("#", "").toLowerCase());
      // Checking for a title
      } else if (term.slice(0,2) === "[[") {
        data.title = term.replace(/\[|\]/g, "");
      // Checking for an author
      } else if (term[0] === "@") {
        data.authors.push(term.replace("@", "").toLowerCase());
      // If the term has no special characters,
      // End iteration and record position for content slicing
      } else {
        contentEndIndex = i;
        break;
      }
    }
  }

  // Extracting content if there's more than
  // a single word left
  if (contentEndIndex > 0) {
    content = terms.slice(0, contentEndIndex+1).join(" ");
    data.content = content;
  }

  return data;
}

/**
 * Files data from a parsed section into the data storage JSON under each relevant tag and author.
 * @param {object} datastore - JSON containing all tags/author and data
 * @param {object} data - JSON containing data from a single section in the tagged document
 */
function fileData(datastore, data) {
  if (data.tags.length > 0) {
    // Iterating over tags and filing content
    for (let i = 0; i < data.tags.length; i++) {
      tag = data.tags[i];
      utils.ensurePropertyExists(datastore, "tags", {})
      utils.ensurePropertyExists(datastore["tags"], tag, []);
      datastore["tags"][tag].push(data);
    }
  } else {
    utils.ensurePropertyExists(datastore, "tags", {})
    utils.ensurePropertyExists(datastore["tags"], "!UNFILED", []);
    datastore["tags"]["!UNFILED"].push(data);
  }

  // Filing under authors, if available
  if (data.authors.length > 0) {
    for (let i = 0; i < data.authors.length; i++) {
      author = data.authors[i];
      utils.ensurePropertyExists(datastore, "authors", {})
      utils.ensurePropertyExists(datastore["authors"], author, []);
      datastore["authors"][author].push(data);
    }
  }
}

exports.parseText = parseText;
