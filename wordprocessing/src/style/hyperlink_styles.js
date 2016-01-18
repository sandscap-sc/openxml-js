var HyperlinkStyle = {
  type: 'character',
  styleId: 'Hyperlink',
  name: {val: 'Hyperlink'},
  basedOn: {val: 'DefaultParagraphFont'},
  uiPriority: {val: 99},
  unhideWhenUsed: {},
  rPr: {
    color: {val: '0563C1'},
    u: {val: 'single'}
  }
};

var FollowedHyperlinkStyle = {
  type: 'character',
  styleId: 'FollowedHyperlink',
  name: {val: 'FollowedHyperlink'},
  basedOn: {val: 'DefaultParagraphFont'},
  uiPriority: {val: 99},
  unhideWhenUsed: {},
  rPr: {
    color: {val: '954F72'},
    u: {val: 'single'}
  }
};

module.exports = [HyperlinkStyle, FollowedHyperlinkStyle];
