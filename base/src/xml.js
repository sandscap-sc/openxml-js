var XML_ESCAPE_CHARACTERS = {
  '>': '&gt;',
  '<': '&lt;',
  "'": '&apos;',
  '"': '&quot;',
  '&': '&amp;'
};

var Xml = {
  /**
   * Creates a new element with the given name, and object structure.
   * @param {String} name
   * @param {Object} [opt_contents] Contents of the element
   * @param {String} [opt_prefix] Optional prefix to add to all element names.
   * @returns {String} Serialized XML contents.
   */
  element: function(name, opt_contents, opt_prefix) {
    var value, string, elements = [], attributes = [];
    var contents = opt_contents || {};
    var keys = Object.keys(contents);

    var prefix = opt_prefix || '';
    if (prefix.length > 0 && prefix.charAt(prefix.length - 1) !== ':') {
      prefix += ':';
    }

    keys.forEach(function(key) {
      value = contents[key];
      if (typeof value === 'undefined' || value === null) {
        // There is no value, treat the key as the literal content
        elements.push(Xml._escape(key));
      } else if (value.constructor === Array) {
        // An array of elements
        value.forEach(function(arrayElement) {
          elements.push(Xml.element(key, arrayElement, opt_prefix));
        });
      } else if (typeof value === typeof {}) {
        // An object, i.e. child element
        elements.push(Xml.element(key, value, opt_prefix));
      } else {
        // This is an attribute
        attributes.push(Xml._getName(key, prefix) + '="' + Xml._escape(value) + '"');
      }
    });

    string = '<' + Xml._getName(name, prefix) + ' ' + attributes.join(' ');
    if (elements.length === 0) {
      string += '/>';
    } else {
      string += '>';
      string += elements.join('');
      string += '</' + Xml._getName(name, prefix) + '>';
    }

    return string;
  },

  /**
   * Builds effective name of an attribute or element given the name and the prefix.
   * @private
   */
  _getName: function(name, opt_prefix) {
    if (name.indexOf(':') !== -1) {
      // Assume that name has already been prefixed
      return name;
    }

    return (opt_prefix || '') + name;
  },

  /**
   * Escape provided text and make it valid inside XML.
   * @private
   */
  _escape: function(text) {
    return (text + '').replace(/([&"<>'])/g, function(str, item) {
      return XML_ESCAPE_CHARACTERS[item];
    });
  }
};

module.exports = Xml;
