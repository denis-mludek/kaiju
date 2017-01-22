const webpackTask = require('./build/webpackTask')


const install = run({
  sh: 'yarn install',
  watch: 'package.json'
})

const webpack = webpackTask({
  config: './watch.js'
})
.dependsOn(install)

const server = runServer({
  httpPort,
  cwd: 'public',
  sh: `python -m SimpleHTTPServer ${httpPort}`
})


proxy(server, 9000).dependsOn(webpack)
