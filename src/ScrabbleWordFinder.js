//grab the dictionary
var ScrabbleWordFinder = (() => {
  var ScrabbleWordFinder = function() {
    this.dict = new ScrabbleDictionary(Object.keys(ScrabbleWordList));
  };

  ScrabbleWordFinder.prototype.find = function(letters) {
    return validWords(this.dict.root, letters);
  };

//validwords pushes words into the result array 
  var validWords = function(node, letters, word = '', results = []) {
    if (node.isWord) {
      results.push(word);
    }
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


  //Does absolutely nothing but should help maybe
  var points = function(word) {
    return ScrabbleWordList[word];
  }

  //
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


