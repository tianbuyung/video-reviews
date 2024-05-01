'use strict';

/**
 * `user-can-update` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In user-can-update middleware.');

    await next();
  };
};
