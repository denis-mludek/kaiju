const styles = require('./button.styl')
import { h, Vnode, EventHandler } from 'kaiju'
import { addClassName } from '../../util/vnode'


interface Props {
  icon?: Vnode
  label?: string
  className?: string
  events?: { mousedown: EventHandler }
}

export default function button({ icon, label, className = '', events }: Props) {
  return h(`button.${className}`, { events }, [
    icon && addClassName(icon, styles.icon) || '',
    label || ''
  ])
}
