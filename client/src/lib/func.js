import md5 from './md5.js';

const func = {
  passwordEncrypt (password) {
    return md5(password);
  }
};

export default func;
