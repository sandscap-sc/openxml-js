var Drawing = function(drawingId, relationshipId, name, desc, fileLocation, length, width) {
  this.length = length || 5943600;
  this.width = width || 7912100;

  this.drawingId = drawingId;
  this.relationshipId = relationshipId;
  this.name = name || '';
  this.desc = desc || '';
  this.fileLocation = fileLocation;

  this._contents = null;
};

Drawing.prototype.setContents = function(contents) {
  this._contents = contents;
};

Drawing.prototype.getContents = function() {
  return this._contents;
};

Drawing.prototype.serialize = function() {
  var structure = {
    'wp:inline': {
      distT: 0,
      distB: 0,
      distL: 0,
      distR: 0,
      'wp:extent': {
        cx: this.length,
        cy: this.width
      },
      'wp:effectExtent': {l: 0, t: 0, r: 0, b: 0},
      'wp:docPr': {id: this.drawingId, name: this.name},
      'wp:cNvGraphicFramePr': this._addNonVisualGraphicFrameProperties(),
      'a:graphic': this._addGraphic()
    }
  };

  return {drawing: structure};
};

Drawing.prototype._addNonVisualGraphicFrameProperties = function() {
  return {
    'a:graphicFrameLocks': {
      'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      noChangeAspect: 1
    }
  };
};

Drawing.prototype._addGraphic = function() {
  return {
    'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'a:graphicData': {
      uri: 'http://schemas.openxmlformats.org/drawingml/2006/picture',
      'pic:pic': this._addPic()
    }
  };
};

Drawing.prototype._addPic = function() {
  return {
    'xmlns:pic': 'http://schemas.openxmlformats.org/drawingml/2006/picture',
    'pic:nvPicPr': {
      'pic:cNvPr': {id: 0, name: this.name, descr: this.desc},
      'pic:cNvPicPr': {
        'a:picLocks': {noChangeAspect: 1, noChangeArrowheads: 1}
      }
    },
    'pic:blipFill': this._addBlipFill(),
    'pic:spPr': this._addShapeProperties()
  };
};

Drawing.prototype._addBlipFill = function() {
  return {
    'a:blip': {
      'r:embed': this.relationshipId,
      cstate: 'print',
      'a:extLst' : {
        'a:ext': {
          uri: '{28A0092B-C50C-407E-A947-70E740481C1C}',
          'a14:useLocalDpi': {
            'xmlns:a14': 'http://schemas.microsoft.com/office/drawing/2010/main',
            val: 0
          }
        }
      }
    },
    'a:srcRect': {},
    'a:stretch': {
      'a:fillRect': {}
    }
  };
};

Drawing.prototype._addShapeProperties = function() {
  return {
    bwMode: 'auto',
    'a:xfrm': {
      'a:off': {x: 0, y: 0},
      'a:ext': {cx: 5943600, cy: 7912100}
    },
    'a:prstGeom': {
      prst: 'rect',
      'a:avLst': {}
    },
    'a:noFill': {},
    'a:ln': {
      'a:noFill': {}
    }
  };
};

module.exports = Drawing;
