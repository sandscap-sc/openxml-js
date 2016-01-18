var createParaPropertiesStyle = function(spacingBefore, outlineLvl) {
  return {
    keepNext: {},
    keepLines: {},
    spacing: {before: spacingBefore},
    outlineLvl: {val: outlineLvl}
  };
};

var createRunPropertiesStyle = function(charSize) {
  return {
    rFonts: {
      asciiTheme: 'majorHAnsi',
      eastAsiaTheme: 'majorEastAsia',
      hAnsiTheme: 'majorHAnsi',
      cstheme: 'majorBidi'
    },
    color: {
      val: '2E74B5',
      themeColor: 'accent1',
      themeShade: 'BF'
    },
    // Script size
    sz: {val: charSize},
    // Complex script size
    szCs: {val: charSize}
  }
};

var DefaultParaStyle = {
  type: 'paragraph',
  default: 1,
  styleId: 'Normal',
  name: {val: 'Normal'},
  qFormat: {}
};

var DefaultCharStyle = {
  type: 'character',
  default : 1,
  styleId: 'DefaultParagraphFont',
  name: {val: 'Default Paragraph Font'},
  uiPriority: {val: 1},
  semiHidden: {},
  unhideWhenUsed: {}
};

var Heading2ParaStyle = {
  type: 'paragraph',
  styleId: 'Heading2',
  name: {val: 'Heading 2'},
  basedOn: {val: 'Normal'},
  next: {val: 'Normal'},
  link: {val: 'Heading2Char'},
  uiPriority: {val: 9},
  unhideWhenUsed: {},
  qFormat: {},
  pPr: createParaPropertiesStyle(40, 1),
  rPr: createRunPropertiesStyle(26)
};

var Heading2CharStyle = {
  type: 'character',
  customStyle: 1,
  styleId: 'Heading2Char',
  name: {val: 'Heading 2 Char'},
  basedOn: {val: 'DefaultParagraphFont'},
  link: {val: 'Heading2'},
  uiPriority: {val: 9},
  rPr: createRunPropertiesStyle(26)
};

var Heading1ParaStyle = {
  type: 'paragraph',
  styleId: 'Heading1',
  name: {val: 'Heading 1'},
  basedOn: {val: 'Normal'},
  next: {val: 'Normal'},
  link: {val: 'Heading1Char'},
  uiPriority: {val: 9},
  qFormat: {},
  pPr: createParaPropertiesStyle(240, 0),
  rPr: createRunPropertiesStyle(32)
};

var Heading1CharStyle = {
  type: 'character',
  customStyle: 1,
  styleId: 'Heading1Char',
  name: {val: 'Heading 1 Char'},
  basedOn: {val: 'DefaultParagraphFont'},
  link: {val: 'Heading1'},
  uiPriority: {val: 9},
  rPr: createRunPropertiesStyle(32)
};

var ListParagraphStyle = {
  type: 'paragraph',
  styleId: 'ListParagraph',
  name: {val: 'List Paragraph'},
  basedOn: {val: 'Normal'},
  uiPriority: {val: 34},
  qFormat: {},
  pPr: {
    ind: {left: 720},
    contextualSpacing: {}
  }
};

module.exports = [
  DefaultParaStyle,
  DefaultCharStyle,
  Heading1ParaStyle,
  Heading1CharStyle,
  Heading2ParaStyle,
  Heading2CharStyle,
  ListParagraphStyle
];