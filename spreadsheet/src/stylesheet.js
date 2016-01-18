var XmlNamespaces = require('oxml-base').Constants.XmlNamespaces;

var Stylesheet = {
  xmlns: XmlNamespaces.sml,
  'xmlns:mc': XmlNamespaces.mc,
  'xmlns:x14ac': XmlNamespaces.x14ac,
  'mc:Ignorable': 'x14ac',
  fonts: {
    count: 1,
    'x14ac:knownFonts': 1,
    font: {
      sz: {val: 12},
      color: {theme: 1},
      name: {val: 'Calibri'},
      family: {val: 2},
      scheme: {val: 'minor'}
    }
  },
  fills: {
    count: 2,
    fill: [
      {patternFill: {patternType: 'none'}},
      {patternFill: {patternType: 'gray125'}}
    ],
    borders: {
      count: 1,
      border: {
        left: {},
        right: {},
        top: {},
        bottom: {},
        diagonal: {}
      }
    },
    cellStyleXfs: {
      count: 1,
      xf: {
        numFmtId: 0,
        fontId: 0,
        fillId: 0,
        borderId: 0
      }
    },
    cellXfs: {
      count: 1,
      xf: {
        numFmtId: 0,
        fontId: 0,
        fillId: 0,
        borderId: 0,
        xfId: 0
      }
    },
    cellStyles: {
      count: 1,
      cellStyle: {
        name: 'Normal',
        xfId: 0,
        builtInId: 0
      }
    },
    dxfs: {count: 0},
    tableStyles: {
      count: 0,
      defaultTableStyle: 'TableStyleMedium9',
      defaultPivotStyle: 'PivotStyleMedium7'
    }
  }
};

module.exports = Stylesheet;
