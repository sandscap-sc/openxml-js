var Xml = {
  /**
   * Creates an element with attributes only.
   * @param {String} name
   * @param {Object} [opt_attributesMap]
   * @param {Object} [opt_content]
   * @returns {string}
   */
  elementWithAttributes: function(name, opt_attributesMap, opt_content) {
    var attribute, attributes = '', string, map = opt_attributesMap || {};

    Object.keys(map).forEach(function(key) {
      attribute = key;
      attribute += '="';
      attribute += map[key];
      attribute += '" ';

      attributes += attribute;
    });

    if (!opt_content) {
      string = '<' + name + ' ' + attributes + '/>';
    } else {
      string = '<' + name + ' ' + attributes + '>' + opt_content + '</' + name + '>';
    }

    return string;
  },

  /**
   * Creates an element with nested only.
   * @param {String} name
   * @param {Object} [opt_content]
   * @returns {string}
   */
  elementWithContent: function(name, opt_content) {
    if (!opt_content) {
      return '<' + name + ' />';
    }

    return '<' + name + '>' + opt_content + '</' + name + '>';
  },

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
        elements.push(key);
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
        attributes.push(Xml._getName(key, prefix) + '="' + value + '"');
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
  }
};

module.exports = Xml;
