

export default {
  render: false,
  message: false
}

export function shouldLog(log, key) {
  return (log === true || log === key)
}
