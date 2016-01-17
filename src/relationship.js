var Relationship = function(id, target, targetType, opt_targetMode) {
  this.id = id;
  this.target = target;
  this.targetType = targetType;
  this.targetMode = opt_targetMode;
};

Relationship.prototype.serialize = function() {
  var props = {
    Id: this.id,
    Type: this.targetType,
    Target: this.target
  };

  if (this.targetMode) {
    props.targetMode = this.targetMode;
  }

  return props;
};

module.exports = Relationship;
