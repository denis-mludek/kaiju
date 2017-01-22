const webpack = require('webpack')
const stripAnsi = require('strip-ansi')
const tasks = require('../node_modules/devloop/lib/tasks')


module.exports = def => {

  const watch = tasks.create(
    'webpack daemon',

    def.cwd || __projectPath,

    function execute(out, success, error) {
      if (!this._watcher) {
        let config

        try {
          config = require(def.config)
        }
        catch(e) {
          out(`Could not load webpack config ${ def.config } relative to the webpackTask's path`)
          return error()
        }

        const compiler = webpack(config)

        compiler.plugin('watch-run', (_, next) => {
          this.compilation = {}
          listen.dirty()
          next()
        })

        this._watcher = compiler.watch({}, (err, stats) => {
          if (err) {
            this.compilation.err = err
            this.compilation.ok = false
          }
          else {
            var jsonStats = stats.toJson()

            if (jsonStats.errors.length > 0) {
              this.compilation.err = stripAnsi(jsonStats.errors.join('\n\n'))
              this.compilation.ok = false
            }
            else {
              this.compilation.ok = true
            }
          }
          this.compilation.cb && this.compilation.cb(this.compilation)
        })

        this.onWatchFinished = function(cb) {
          if (this.compilation.ok === undefined) this.compilation.cb = cb
          else cb(this.compilation)
        }
      }
      success()
    },

    function kill() {
      this._watcher && this._watcher.close()
      this._watcher = undefined
    }
  )


  const listen = tasks.create(
    def.name || 'watch',

    watch.cwd,

    function execute(out, success, error) {
      watch.onWatchFinished(({ ok, err }) => {
        if (ok)
          success()
        else {
          out(err)
          error()
        }
      })
    },

    function kill() {
      // Nothing to kill here: This task is passive
      // as we never want to kill the watch process while devloop runs
    }
  ).dependsOn(watch)

  // Lift dependencies to the inner watcher task as 'listen' is passive and shouldn't have dependencies
  listen.dependsOn = function() {
    watch.dependsOn.apply(watch, arguments)
    return listen
  }

  return listen
}
