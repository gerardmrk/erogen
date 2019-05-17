/* eslint-disable */
"use strict";

// This is a global mock for @loadable/component

const loadable = async fn => {
  const mod = await fn();
  return mod.default;
};

module.exports = loadable;
exports.default = loadable;
exports.loadable = loadable;
