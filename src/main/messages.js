const { dialog } = require('electron').remote;

exports.showErrMsg = (val) => {
  dialog.showErrorBox('错误信息', val);
};