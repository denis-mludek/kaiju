import { TweenLite } from './gsap';
import { api as router } from 'abyssa';


export const contentAnimation = {
  create: (_: any, vnode: any) => {
    if (!vnode.elm || router.isFirstTransition()) return;

    vnode.elm.style.display = 'none';

    TweenLite.fromTo(vnode.elm, 0.2,
      { css: { opacity: 0 } },
      { css: { opacity: 1 }, delay: 0.22 }
    ).eventCallback('onStart', (): any => vnode.elm.style.removeProperty('display'))
  },

  remove: (vnode: any, cb: any) => {
    if (!vnode.elm) cb();

    TweenLite.fromTo(vnode.elm, 0.2,
      { css: { opacity: 1 } },
      { css: { opacity: 0 } }
    ).eventCallback('onComplete', cb);
  }
};
