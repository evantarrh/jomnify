var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

// How strange, on a scale of 0 to 1, you want the result to be
var STRANGENESS_INDEX = 0.15;

var replacements = {
  "a": ["a", "a", "ab", "am", ""],
  "e": ["e", "eb", ""],
  "i": ["i", ""],
  "n": ["n", "m", "mm"],
  "r": ["r", "rb"],
  "o": ["o", ""],
  "u": ["u", ""]
};

function walk (node)
{
  var child;
  var next;

  if (node.nodeType == DOCUMENT_FRAGMENT) {
    child = node.firstChild;
      while ( child )
      {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
  }
  else if (node.nodeType == TEXT) {
    var tagName = node.parentElement.tagName.toLowerCase();
    if(tagName != "script" && tagName != "style") {
          replaceText(node);
      }
  }
}

function replaceText(textNode) {
  var chars = textNode.nodeValue.split('');

  chars.forEach(function(char, i) {
    // make substitutions
    if (Math.random() < STRANGENESS_INDEX && char.match(/[aeinrou]/)) {
      var possibleSubs = replacements[char];
      chars[i] = possibleSubs[Math.floor(Math.random()*possibleSubs.length)];
    }
    // make everything lowercase
    if (char.match(/[A-Z]/)) {
      chars[i] = char.toLowerCase();
    }
  });

  textNode.nodeValue = chars.join("");
}

walk(document.body);
