

export default {
  render: false,
  message: false
};

export function shouldLog(log, component) {
  return component.log === true && (log === true || log === component.key);
}