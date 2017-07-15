import { createElement, Component } from 'react'
import { findDOMNode } from 'react-dom'
import generateOutsideCheck from 'utils/checkClickOutside'

const registeredComponents = [  ]
const handlers = [  ]

export default function onClickOutsideHOC(WrappedComponent, config) {
  class onClickOutside extends Component {

    getInstance() {
      if (!WrappedComponent.prototype.isReactComponent) {
        return this
      }
      const ref = this.instanceRef
      return ref.getInstance ? ref.getInstance() : ref
    }

    componentDidMount() {
      if (typeof document === 'undefined' || !document.createElement){
        return
      }

      const instance = this.getInstance()
      var clickOutsideHandler

      if (config && typeof config.handleClickOutside === 'function') {
        clickOutsideHandler = config.handleClickOutside(instance)
        if (typeof clickOutsideHandler !== 'function') {
          throw new Error('WrappedComponent lacks a function for processing outside click events specified by the handleClickOutside config option.')
        }
      } else if (typeof instance.handleClickOutside === 'function') {
        if (Component.prototype.isPrototypeOf(instance)) {
          clickOutsideHandler = instance.handleClickOutside.bind(instance)
        } else {
          clickOutsideHandler = instance.handleClickOutside
        }
      } else if (typeof instance.props.handleClickOutside === 'function') {
        clickOutsideHandler = instance.props.handleClickOutside
      } else {
        throw new Error('WrappedComponent lacks a handleClickOutside(event) function for processing outside click events.')
      }

      const componentNode = findDOMNode(this.instanceRef)
      this.__outsideClickHandler = generateOutsideCheck(
        componentNode,
        clickOutsideHandler,
        this.props.outsideClickIgnoreClass,
        this.props.excludeScrollbar,
        this.props.preventDefault,
        this.props.stopPropagation
      )

      const pos = registeredComponents.length
      registeredComponents.push(this)
      handlers[pos] = this.__outsideClickHandler

      // If there is a truthy disableOnClickOutside property for this
      // component, don't immediately start listening for outside events.
      if (!this.props.disableOnClickOutside) {
        this.enableOnClickOutside()
      }
    }

    /**
    * Track for disableOnClickOutside props changes and enable/disable click outside
    */
    componentWillReceiveProps(nextProps) {
      if (this.props.disableOnClickOutside && !nextProps.disableOnClickOutside) {
        this.enableOnClickOutside()
      } else if (!this.props.disableOnClickOutside && nextProps.disableOnClickOutside) {
        this.disableOnClickOutside()
      }
    }

    /**
     * Remove all document's event listeners for this component
     */
    componentWillUnmount() {
      this.disableOnClickOutside()
      this.__outsideClickHandler = false
      const pos = registeredComponents.indexOf(this)
      if (pos > -1) {
        // clean up so we don't leak memory
        if (handlers[pos]) { handlers.splice(pos, 1) }
        registeredComponents.splice(pos, 1)
      }
    }

    /**
     * Can be called to explicitly enable event listening
     * for clicks and touches outside of this element.
     */
    enableOnClickOutside() {
      const fn = this.__outsideClickHandler
      if (typeof document !== 'undefined') {
        let events = this.props.eventTypes
        if (!events.forEach) {
          events = [ events ]
        }
        events.forEach(eventName => document.addEventListener(eventName, fn))
      }
    }

    disableOnClickOutside() {
      const fn = this.__outsideClickHandler
      if (typeof document !== 'undefined') {
        let events = this.props.eventTypes
        if (!events.forEach) {
          events = [ events ]
        }
        events.forEach(eventName => document.removeEventListener(eventName, fn))
      }
    }

    getRef(ref) {
      this.instanceRef = ref
    }

    render() {
      var props = Object.keys(this.props)
        .filter(prop => prop !== 'excludeScrollbar')
        .reduce((props, prop) => {
          props[prop] = this.props[prop]
          return props
        }, {})

      if (WrappedComponent.prototype.isReactComponent) {
        props.ref = this.getRef
      } else {
        props.wrappedRef = this.getRef
      }

      props.disableOnClickOutside = this.disableOnClickOutside
      props.enableOnClickOutside = this.enableOnClickOutside

      return createElement(WrappedComponent, props)
    }
  }
  onClickOutside.displayName = `OnClickOutside(${ WrappedComponent.displayName || WrappedComponent.name || 'Component' })`
  onClickOutside.defaultProps = {
    eventTypes: [ 'mousedown', 'touchstart' ],
    excludeScrollbar: (config && config.excludeScrollbar) || false,
    outsideClickIgnoreClass: 'ignore-onclickoutside',
    preventDefault: false,
    stopPropagation: false,
  }
  onClickOutside.getClass = () => WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent
  return onClickOutside
}
