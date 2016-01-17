var createTableBorder = function(val, sz, color) {
  return {
    val: 'single',
    sz: sz,
    space: 0,
    color: color
  };
};

var tableBorder = createTableBorder('single', 4, 999999);
//var tableBorder = {val: 'single', sz: 4, space: 0, color: 999999, themeColor: 'text1', themeTint: '66'};
var tblCellMar = {
  top: {w: 0, type: 'dxa'},
  left: {w: 108, type: 'dxa'},
  bottom: {w: 0, type: 'dxa'},
  right: {w: 108, type: 'dxa'}
};

var rPr = {b: {}, bCs: {}};

var DefaultTableStyle = {
  type: 'table',
  default: 1,
  styleId: 'TableNormal',
  name: {val: 'Normal Table'},
  uiPriority: {val: 99},
  semiHidden: {},
  unhideWhenUsed: {},
  tblPr: {
    tblInd: {w: 0, type: 'dxa'},
    tblCellMar: tblCellMar
  }
};

var GridTable1LightStyle = {
  type: 'table',
  customStyle: 1,
  styleId: 'GridTable1Light1',
  name: {val: 'Grid Table 1 Light 1'},
  basedOn: {val: 'TableNormal'},
  uiPriority: {val: 46},
  tblPr: {
    tblStyleRowBandSize: {val: 1},
    tblStyleColBandSize: {val: 1},
    tblInd: {w: 0, type: 'dxa'},
    tblBorders: {
      top: tableBorder,
      left: tableBorder,
      bottom: tableBorder,
      right: tableBorder,
      insideH: tableBorder,
      insideV: tableBorder
    },
    tblCellMar: tblCellMar
  },
  tblStylePr: [
    {
      type: 'firstRow',
      rPr: rPr,
      tblPr: {},
      tcPr: {
        tcBorders: {
          bottom: createTableBorder('single', 12, 666666)
        }
      }
    },
    {
      type: 'lastRow',
      rPr: rPr,
      tblPr: {},
      tcPr: {
        tcBorders: {
          bottom: createTableBorder('double', 2, 666666)
        }
      }
    },
    {
      type: 'firstCol',
      rPr: rPr
    },
    {
      type: 'lastCol',
      rPr: rPr
    }
  ]
};

module.exports = [DefaultTableStyle, GridTable1LightStyle];
