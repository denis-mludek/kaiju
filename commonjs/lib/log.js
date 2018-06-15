"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldLog = shouldLog;
exports.default = {
  render: false,
  message: false
};
function shouldLog(log, component) {
  return component.log === true && (log === true || log === component.key);
}