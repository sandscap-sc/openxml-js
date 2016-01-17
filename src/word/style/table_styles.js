var DefaultTableStyle = {
  type: 'table',
  default: 1,
  styleId: 'TableNormal',
  name: {val: 'Normal Table'},
  uiPriority: {val: 99},
  semiHidden: {},
  unhideWhenUsed: {},
  tblPr: {
    tblInd: {
      w: 0,
      type: 'dxa'
    },
    tblCellMar: {
      top: {w: 0, type: 'dxa'},
      left: {w: 108, type: 'dxa'},
      bottom: {w: 0, type: 'dxa'},
      right: {w: 108, type: 'dxa'}
    }
  }
};

module.exports = [DefaultTableStyle];
