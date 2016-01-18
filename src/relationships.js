var Xml = require('./xml');

var Relationship = require('./relationship');

var Relationships = function() {
  this._nextId = 1;
  this.rels = [];
};

/**
 * Creates a new relationship in the collection and assigns and ID automatically.
 * @param {string} target
 * @param {string} targetType
 * @param {string} [opt_targetMode]
 * @returns {Relationship}
 */
Relationships.prototype.add = function(target, targetType, opt_targetMode) {
  var id = 'rId' + this._nextId++;

  var relationship = new Relationship(id, target, targetType, opt_targetMode);
  this.rels.push(relationship);

  return relationship;
};

Relationships.prototype.serialize = function() {
  return Xml.element('Relationships', {
    xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships',
    Relationship: this.rels.map(function(rel) { return rel.serialize(); })
  });
};

module.exports = Relationships;
