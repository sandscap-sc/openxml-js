var Utils = {
  /**
   * Sanitizes names so that it works well with Excel.
   * @param {string} name
   * @returns {string}
   */
  sanitizeName: function(name) {
    return name.replace(/\W/g, '_');
  }
};

module.exports = Utils;
