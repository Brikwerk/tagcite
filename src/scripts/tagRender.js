const constants = require('./constants');
const tagStats = require('./tagStats');
const events = require('./events');

/**
 * Takes a JSON object which is rendered into HTML content. The following
 * keys and values are expected within the JSON object.
 * - title: A string containing the title for the section
 * - content: A string containing the text content for the section
 * - authors: An array containing a list of authors as strings
 * - tags: An array containing a list of tags as strings
 * @param {JSON} data - A JSON object containing data to render into a section
 * @returns HTMLElement
 */
function renderData(data) {
  let title = data.title;
  let content = data;

  // Node Creation
  let contentContainer = document.createElement("div");
  let contentHeader = document.createElement("h3");
  let contentText = document.createElement("p");
  let contentAuthors = document.createElement("h4");
  let contentTags = document.createElement("h4");

  // Styling
  contentContainer.className = "tag-content-container";
  contentHeader.className = "tag-content-title";
  contentText.className = "tag-content-text";
  contentAuthors.className = "tag-content-authors";
  contentTags.className = "tag-content-tags";

  // Content insertion
  contentHeader.innerHTML = title;
  contentText.innerHTML = content.content;

  // Checking if we have an iterable list of authors
  if (content.authors !== undefined && content.authors.length > 0 && typeof content.authors === "object") {
    contentAuthors.appendChild(document.createTextNode("Author(s): "));
    for (let i = 0; i < content.authors.length; i++) {
      // Linking tags to go to respective ID on click
      authorNode = document.createElement("a");
      authorNode.setAttribute("href", "javascript: void(0)");
      authorNode.appendChild(document.createTextNode(content.authors[i]));
      authorNode.setAttribute("onclick", "TagCite.goToSection('" + content.authors[i] + "', 'author')");
      contentAuthors.appendChild(authorNode);
      // If we're not on the last author, add separator
      if (i + 1 < content.authors.length) {
        contentAuthors.appendChild(document.createTextNode(" | "));
      }
    }
  } else {
    contentAuthors.innerHTML = "Author(s): Unspecified";
  }

  // Checking if we have an iterable list of tags
  if (content.tags !== undefined && content.tags.length > 0 && typeof content.tags === "object") {
    contentTags.innerHTML = "Tags: "
    for (let i = 0; i < content.tags.length; i++) {
      // Linking tags to go to respective ID on click
      tagNode = document.createElement("a");
      tagNode.setAttribute("href", "javascript: void(0)");
      tagNode.innerHTML = content.tags[i];
      tagNode.setAttribute("onclick", "TagCite.goToSection('" + content.tags[i] + "', 'tag')");
      contentTags.appendChild(tagNode);
      // If we're not on the last tag, add separator
      if (i + 1 < content.tags.length) {
        contentTags.innerHTML += " | ";
      }
    }
  } else {
    contentTags.innerHTML = "Tags: " + content.tags;
  }

  // Appending children
  contentContainer.appendChild(contentHeader);
  contentContainer.appendChild(contentText);
  contentContainer.appendChild(contentTags);
  contentContainer.appendChild(contentAuthors);

  return contentContainer;
}

/**
 * Writes out all tags to the HTML and hides/displays relevant sections.
 * @param {object} sections - JSON containing all tag data
 * @param {HTMLElement} container - An HTML element to contain the rendered sections
 * @param {string} type - A string specifying the type of data
 */
function renderSections(sections, container, type) {
  // Appending tags and content to tag container
  let tags = Object.keys(sections).sort();
  for (let i  = 0; i < tags.length; i++) {
    let tag = tags[i];
    // Container for tag header element
    let textTag = document.createElement("div");
    textTag.className = "tag";
    
    // Adding appropriate ID suffix
    if (type === "authors") {
      textTag.id = tag + constants.AUTHOR_SUFFIX;
    } else {
      // Default
      textTag.id = tag + constants.TAG_SUFFIX;
    }

    // Tag header and text
    let heading = document.createElement("h2");
    let node = document.createTextNode(tag);
    // Weighting tag
    let weight;
    if (type === "authors") {
      weight = tagStats.getSectionWeight(sections[tag].length, "author");
    } else {
      weight = tagStats.getSectionWeight(sections[tag].length, "tag");
    }
    textTag.style.height = weight + "rem";
    heading.style["font-size"] = weight + "rem";
    // Adding click listener to tag heading
    heading.addEventListener("click", events.sectionClicked);
    // Appending
    heading.appendChild(node);
    textTag.appendChild(heading);
    container.appendChild(textTag);

    // Creating content node
    let contentNode = createContentNode(tag, sections[tag]);
    // Appending
    container.appendChild(contentNode);
  }

  // Hiding loader and showing tag container
  document.getElementById("main-loader").style.display = "None";
  container.style.display = "block";
}

/**
 * Builds the HTML node with all data pertaining to the tag.
 * @param {string} tag - The tag which corresponds to the content
 * @param {object} data - JSON containing relevant tagged data
 */
function createContentNode(tag, data) {
  let contentNode = document.createElement("section");
  contentNode.className = "tag-content disabled";
  contentNode.id = tag;

  // Adding content node close and close event listener
  let contentClose = document.createElement("div");
  contentClose.className = "tag-content-close";
  contentClose.innerHTML = "[X] Close";
  contentClose.setAttribute("content-node-id", tag);
  contentClose.addEventListener("click", events.sectionClose);
  contentNode.appendChild(contentClose);

  // Adding border close
  let borderClose = document.createElement("div");
  borderClose.innerHTML = "<div></div>";
  borderClose.className = "tag-content-border-close";
  borderClose.setAttribute("content-node-id", tag);
  borderClose.addEventListener("click", events.sectionClose);
  contentNode.appendChild(borderClose);

  // Adding content sections
  for (let i = 0; i < data.length; i++) {
    // Appending to container;
    let html = document.createElement("div");
    html.innerHTML = data[i]["html"].innerHTML
    html.className = "tag-content-container";
    // Injecting pre-rendered HTML into content node
    contentNode.appendChild(html);
  }

  return contentNode;
}

function renderDatastore(datastore) {
  // Displaying title
  document.getElementById("data-tags-title").style.display = "block";
  // Rendering tags to the page
  tagContainer = document.getElementById("tag-container");
  renderSections(datastore["tags"], tagContainer, "tags");

  // Rendering authors to the page, if available
  if (datastore.hasOwnProperty("authors")) {
    if (Object.keys(datastore["authors"]).length > 0) {
      // Displaying title
      document.getElementById("data-authors-title").style.display = "block";
      // Rendering tags
      authorContainer = document.getElementById("author-container");
      renderSections(datastore["authors"], authorContainer, "authors");
    }
  }
}

exports.renderData = renderData;
exports.renderDatastore = renderDatastore;
