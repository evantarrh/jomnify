var ELEMENT = 1;
var DOCUMENT = 9;
var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

// How strange, on a scale of 0 to 1, you want the result to be
var STRANGENESS_INDEX = 0.1;

replacements = {
  "a": ["ab", "an", "am", "o"],
  "e": ["eb", "er"],
  "i": ["i", "im"],
  "n": ["n", "m", "nn"],
  "r": ["r", "rb"],
  "o": ["o", "or"],
  "u": ["ur", "um", ""]
};




function walk(node) 
{
  // I stole this function from here:
  // http://is.gd/mwZp7E
  
  var child, next;

  switch ( node.nodeType )  
  {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while ( child ) 
      {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      if(node.parentElement.tagName.toLowerCase() != "script" && node.parentElement.tagName.toLowerCase() != "style") {
          replaceText(node);
      }
      break;
  }
}

function replaceText(textNode) {
  var chars = textNode.nodeValue.split('');

  chars.forEach(function(char, i) {
    // if (Math.random() < STRANGENESS_INDEX && char.match(/[a-zA-Z]/)) {
    //   chars[i] = charactersDictionary[char][0];
    // }
    if (Math.random() < STRANGENESS_INDEX && char.match(/[aeinou]/)) {
      chars[i] = replacements[char][Math.floor(Math.random()*replacements[char].length)];
    }
    if (char.match(/[A-Z]/)) {
      chars[i] = char.toLowerCase();
    }
  });

  textNode.nodeValue = chars.join("");
}

walk(document.body);

