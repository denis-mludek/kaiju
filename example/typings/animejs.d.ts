

declare module "animejs" {
  type Easing = 'easeInBack' | 'easeInBounce' | 'easeInCirc' | 'easeInCubic' | 'easeInElastic' |
    'easeInExpo' | 'easeInOutBack' | 'easeInOutBounce' | 'easeInOutCirc' | 'easeInOutCubic' | 'easeInOutElastic' |
    'easeInOutExpo' | 'easeInOutQuad' | 'easeInOutQuart' | 'easeInOutQuint' | 'easeInOutSine' | 'easeInQuad' |
    'easeInQuart' | 'easeInQuint' | 'easeInSine' | 'easeOutBack' | 'easeOutBounce' | 'easeOutCirc' | 'easeOutCubic' |
    'easeOutElastic' | 'easeOutExpo' | 'easeOutQuad' | 'easeOutQuart' | 'easeOutQuint' | 'easeOutSine' | 'linear'


  interface Options {
    targets: any,

    duration?: number | ((target: any, index: number, total: number) => number)
    delay?: number | ((target: any, index: number, total: number) => number)
    autoplay?: boolean
    loop?: boolean
    easing?: Easing
    elasticity?: number
    rounte?: number | boolean
    direction?: 'normal' | 'reverse' | 'alternate'

    begin?: Function
    update?: Function
    complete?: Function

    [animationProp: string]: any
  }

  var animate: (options: Options) => void

  export = animate
}
