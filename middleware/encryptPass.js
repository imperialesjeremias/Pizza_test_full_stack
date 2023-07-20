const { hashSync, compareSync } = require('bcryptjs');

const encryptPass = (pass) => {
  const salt = 10;
  return hashSync(pass, salt);
};

const comparePass = (pass, passwordDB) => {
  return compareSync(pass, passwordDB);
};

module.exports = {
  encryptPass,
  comparePass,
};
