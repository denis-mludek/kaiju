
// Injected by the webpack build
declare const env: {
  isProd: boolean
  isDev: boolean
}

// Basic typings for all the .less files.
// Ideally we would use something like typed-css-module but it's way too broken.
declare module '*.less' {
  interface ClassNames {
    [className: string]: string
  }
  const classNames: ClassNames
  export = classNames
}