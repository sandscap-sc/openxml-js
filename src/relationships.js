var Relationship = require('./relationship');

var Relationships = function() {
  this._nextId = 1;
  this.rels = [];
};

Relationships.prototype.add = function(target, targetType, opt_targetMode) {
  var id = 'rId' + this._nextId++;

  var relationship = new Relationship(id, target, targetType, opt_targetMode);
  this.rels.push(relationship);

  return relationship;
};

Relationships.prototype.serialize = function() {
  var string = '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';

  this.rels.forEach(function(rel) {
    string += rel.serialize();
  });

  string += '</Relationships>';
  return string;
};

module.exports = Relationships;
