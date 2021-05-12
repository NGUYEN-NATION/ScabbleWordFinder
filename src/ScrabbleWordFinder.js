//grab the dictionary
var ScrabbleWordFinder = (() => {
  var ScrabbleWordFinder = function() {
    this.dict = new ScrabbleDictionary(Object.keys(ScrabbleWordList));
  };

  //global vars for now to get the 2x and 3x values
  //Globals var unncessary
  //
  ScrabbleWordFinder.prototype.find = function(letters) {
    return validWords(this.dict.root, letters);
  };

//validwords pushes words into the result array 
//Valid words now pushes points into the result array as well. 
  var validWords = function(node, letters, word = '', results = []) {
    //If it is a word, call the points function and then YEET IT INTO RESULTS
    //Added word | points for QUALITY OF LIFE BECAUSE QUALITY OF LIFE IS A THING
    if (node.isWord) {
      score = points(word);
      results.push('Word: ' + word + ' | ' + 'Points: ' + score);
    }
    //Some random set thingy
    //Just checks letters and adds stuff
    var seen = new Set();
    for (let ch of letters) {
      if (!seen.has(ch)) {
        seen.add(ch);
        if (node.children[ch]) {
          validWords(node.children[ch], letters.replace(ch, ''), word + ch, results);
        }
      }
    }
    return results;
  };

  //Calculates the points, takes in a word and if it is using point modifier
  //Replaced the old condition with getting element by id
  //Now multiplies by 2 or 3 or both depending on whether the checkbox is checked or not. 
  var points = function(word) {
    let score = ScrabbleWordList[word];
    if(isDouble.checked)
    {
      score *= 2;
    }
    if(isTriple.checked)
    {
      score *= 3;
    }
    return score;
  }


  var ScrabbleDictionary = function(words) {
    this.root = new ScrabbleTrieNode();
    words.forEach(word => this.insert(word));
  };

  var ScrabbleTrieNode = function() {
    this.children = Object.create(null);
  };

  ScrabbleDictionary.prototype.insert = function(word) {
    var cursor = this.root;
    for (let letter of word) {
      if (!cursor.children[letter]) {
        cursor.children[letter] = new ScrabbleTrieNode();
      }
      cursor = cursor.children[letter];
    }
    cursor.isWord = true;
  };

  return new ScrabbleWordFinder();
})();


