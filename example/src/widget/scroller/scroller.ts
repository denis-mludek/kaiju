import { h, Component, VNode, Message, NoArgMessage, ConnectParams, RenderParams } from 'kaiju'
import { Observable } from 'kaiju/observable'
import { Option } from 'option.ts'


interface Props {
  hasMore: boolean
  isLoadingMore: boolean
  loadMore: NoArgMessage
  scrollOwner?: HTMLElement
  treshold?: number
  list: VNode[]
  styleName?: string
}

export default function(props: Props) {
  return Component<Props, {}>({ name: 'infiniteScroll', props, initState, connect, render })
}

function initState() {
  return {}
}


const setScroller = Message<Element>('setScroller')
const locallyScrolled = Message<Event>('locallyScrolled')
const scrollChanged = Message('scrollChanged')


function connect({ on, props, msg }: ConnectParams<Props, {}>) {

  let scroller: Element | undefined
  const onScrollChanged = () => msg.send(scrollChanged())

  Option(props().scrollOwner).match({
    Some: scrollOwner => {
      scroller = scrollOwner
      onScrollChanged()
      on(Observable.fromEvent('scroll', scrollOwner).debounce(60), onScrollChanged)
    },
    None: () => {
      on(setScroller, (state, localScroller) => {
        scroller = localScroller
        onScrollChanged()
      })
      on(msg.listen(locallyScrolled).debounce(60), onScrollChanged)
    }
  })

  on(Observable.fromEvent('resize', window).debounce(600), onScrollChanged)

  on(scrollChanged, state => {
    const { treshold = 200, hasMore, isLoadingMore, loadMore } = props()

    if (!scroller) return
    if (!hasMore || isLoadingMore) return

    const reachedBottom = (scroller.scrollTop + scroller.clientHeight + treshold) > scroller.scrollHeight

    if (reachedBottom) msg.sendToParent(loadMore())
  })

  on(Message.unhandled, (state, m) => msg.sendToParent(m))
}


function render({ props, msg }: RenderParams<Props, {}>) {
  const { scrollOwner, list, styleName } = props

  const attrs = styleName ? { class: styleName } : undefined
  const events = scrollOwner ? undefined : { scroll: locallyScrolled }
  const hook = scrollOwner ? undefined : { insert: (vnode: VNode) => msg.send(setScroller(vnode.elm)) }

  return (
    h('div', {
      attrs,
      events,
      hook
    }, list)
  )
}
