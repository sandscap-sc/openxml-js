var Drawing = function(relationshipId, name, desc, fileLocation, length, width) {
  this.length = length || 5943600;
  this.width = width || 7912100;

  this.relationshipId = relationshipId;
  this.name = name || '';
  this.desc = desc || '';
  this.fileLocation = fileLocation;
};

Drawing.prototype.serialize = function() {
  var string = '<w:drawing>';
  string += '<wp:inline distT="0" distB="0" distL="0" distR="0">';
  string += '<wp:extent cx="' + this.length + '" cy="' + this.width + '" />';
  string += '<wp:effectExtent l="0" t="0" r="0" b="0"/>';

  string += '<wp:docPr id="1" name="' + this.name + '" />';

  string += this._addNonVisualGraphicFrameProperties();
  string += this._addGraphic();

  string += '</wp:inline>';
  string += '</w:drawing>';
  return string;
};

Drawing.prototype._addNonVisualGraphicFrameProperties = function() {
  var string = '<wp:cNvGraphicFramePr>';
  string += '<a:graphicFrameLocks ' +
    'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>';
  string += '</wp:cNvGraphicFramePr>';
  return string;
};

Drawing.prototype._addGraphic = function() {
  var string = '<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"> ';
  string += '<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"> ';

  string += this._addPic();

  string += '</a:graphicData>';
  string += '</a:graphic>';
  return string;
};

Drawing.prototype._addPic = function() {
  var string = '<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">';

  // Non-visual picture properties
  string += '<pic:nvPicPr>';
  string += '<pic:cNvPr id="0" name="' + this.name + '" descr="' + this.desc + '"/>';
  string += '<pic:cNvPicPr> <a:picLocks noChangeAspect="1" noChangeArrowheads="1"/></pic:cNvPicPr>';
  string += '</pic:nvPicPr>';

  string += this._addBlipFill();
  string += this._addShapeProperties();

  string += '</pic:pic>';
  return string;
};

Drawing.prototype._addBlipFill = function() {
  var string = '<pic:blipFill>';

  string += '<a:blip r:embed="' + this.relationshipId + '" cstate="print">';
  string += '<a:extLst>';
  string +=
    '<a:ext uri="{28A0092B-C50C-407E-A947-70E740481C1C}"> ' +
    '<a14:useLocalDpi xmlns:a14="http://schemas.microsoft.com/office/drawing/2010/main" val="0"/>' +
    '</a:ext>';
  string += '</a:extLst>';
  string += '</a:blip>';

  string += '<a:srcRect/> <a:stretch> <a:fillRect/> </a:stretch>';
  string += '</pic:blipFill>';

  return string;
};

Drawing.prototype._addShapeProperties = function() {
  var string = '<pic:spPr bwMode="auto">';

  string += '<a:xfrm> <a:off x="0" y="0"/> <a:ext cx="5943600" cy="7912100"/> </a:xfrm>';
  string += '<a:prstGeom prst="rect"> <a:avLst/> </a:prstGeom>';
  string += '<a:noFill/>';
  string += '<a:ln> <a:noFill/> </a:ln>';
  string += '</pic:spPr>';

  return string;
};

module.exports = Drawing;
