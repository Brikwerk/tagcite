// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

// Source: https://github.com/jserz/js_piece/blob/master/DOM/NonDocumentTypeChildNode/nextElementSibling/nextElementSibling.md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('nextElementSibling')) {
      return;
    }
    Object.defineProperty(item, 'nextElementSibling', {
      configurable: true,
      enumerable: true,
      get: function () {
        var el = this;
        while (el = el.nextSibling) {
          if (el.nodeType === 1) {
              return el;
          }
        }
        return null;
      },
      set: undefined
    });
  });
})([Element.prototype, CharacterData.prototype]);

// previousElementSibling support for IE8 
// Source: https://github.com/Alhadis/Snippets/blob/master/js/polyfills/IE8-child-elements.js
if(!("previousElementSibling" in document.documentElement)){
  Object.defineProperty(Element.prototype, "previousElementSibling", {
    get: function(){
      var e = this.previousSibling;
      while(e && 1 !== e.nodeType)
        e = e.previousSibling;
      return e;
    }
  });
}

// previousElementSibling support for IE9+ and Safari
// Source: https://github.com/jserz/js_piece/blob/master/DOM/NonDocumentTypeChildNode/previousElementSibling/previousElementSibling.md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('previousElementSibling')) {
      return;
    }
    Object.defineProperty(item, 'previousElementSibling', {
      configurable: true,
      enumerable: true,
      get: function () {
        let el = this;
        while (el = el.previousSibling) {
          if (el.nodeType === 1) {
            return el;
          }
        }
        return null;
      },
      set: undefined
    });
  });
})([Element.prototype, CharacterData.prototype]);