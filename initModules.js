import authModule from './modules/auth/index.js';
const initModules = (app) => {
  authModule.init(app);
};

export default initModules;