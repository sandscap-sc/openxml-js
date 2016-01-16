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
      attribute += ' = "';
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
  }
};

module.exports = Xml;
