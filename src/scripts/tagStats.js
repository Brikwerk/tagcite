/**
 * Gets and stores statistics on the tags
 * @param {object} datastore - Contains all data pertaining to the input file
 */
function getTagStats(datastore) {
  // Getting stats
  tags = datastore["tags"];
  stats = getStats(tags);

  // Storings stats in session storage
  sessionStorage.tagMaxLength = stats["maxLength"]
  sessionStorage.tagMinLength = stats["maxLength"]
  sessionStorage.tagMedian = stats["median"]
  sessionStorage.tag75thPercentile = stats["percentile"]
}

/**
 * Gets and stores statistics on the tags
 * @param {object} datastore - Contains all data pertaining to the input file
 */
function getAuthorStats(datastore) {
  // Getting stats
  authors = datastore["authors"];
  stats = getStats(authors);

  // Storings stats in session storage
  sessionStorage.authorMaxLength = stats["maxLength"]
  sessionStorage.authorMinLength = stats["maxLength"]
  sessionStorage.authorMedian = stats["median"]
  sessionStorage.author75thPercentile = stats["percentile"]
}

/**
 * Calculates and records stats about the number of values 
 * under top-level keys in a JSON object
 * @param {object} data - JSON object containing keys and values
 * @returns {object} A JSON object containing: 
 *  - Max key array length
 *  - Min key array length
 *  - Median key array length
 *  - 75th percentile key array length
 */
function getStats(data) {
  let maxLength = 0;
  let minLength = Infinity;
  let keys = Object.keys(data);
  let keyCountLengths = [];

  // Iterating over tags to count of # of sections under them
  for (let i = 0; i < keys.length; i++) {
    let length = data[keys[i]].length;
    keyCountLengths.push(length);
    if (length > maxLength) {
      maxLength = length;
    } else if (length < minLength) {
      minLength = length
    }
  }

  // Getting median and 75th percentile
  keyCountLengths.sort(function(a, b) {
    return a - b;
  })

  let arrayMid = Math.floor(keyCountLengths.length/2);
  let percentileIndex = Math.floor((keyCountLengths.length - 1) * 0.95);
  let median;
  let percentile;

  // If the array is not even, take the middle value
  if (keyCountLengths.length % 2) {
    median = keyCountLengths[arrayMid];
    percentile = keyCountLengths[percentileIndex];
  } else {
    median = (keyCountLengths[arrayMid-1] + keyCountLengths[arrayMid])/2.0;
    percentile = (keyCountLengths[percentileIndex] + keyCountLengths[percentileIndex+1])/2.0;
  }

  return {
    "maxLength": maxLength,
    "minLength": minLength,
    "median": median,
    "percentile": percentile
  }
}

/**
 * Calculates the weight to be applied to a tag based on the number of sections under it.
 * @param {int} length - The number of sections under a tag
 */
function getSectionWeight(length, type) {
  let median;
  if (type === "author") {
    median = sessionStorage.authorMedian;
  } else {
    median = sessionStorage.tagMedian;
  }
  let max;
  if (type === "author") {
    max = sessionStorage.author75thPercentile;
  } else {
    max = sessionStorage.tag75thPercentile;
  }
  let maxFontSize = 1.75;
  if (length > median) {
    let weight = (((length - median)/(max - median)) * (maxFontSize - 1)) + 1;
    if (weight > maxFontSize) {
      return maxFontSize;
    } else {
      return weight;
    }
  } else {
    return 1;
  }
}

exports.getTagStats = getTagStats;
exports.getAuthorStats = getAuthorStats;
exports.getSectionWeight = getSectionWeight;