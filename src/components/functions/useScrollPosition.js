import { useRef, useLayoutEffect } from 'react'

const isBrowser = typeof window !== `undefined`

function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  // The getBoundingClientRect() is a powerful method to get the 
  // size and the position of an element's bounding box, 
  // relative to the viewport.

  return useWindow 
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

export function useScrollPosition(effect, deps, element, useWindow, wait) {
  const position = useRef(getScrollPosition({ useWindow }))
  // Note, that I'm using the useRef() and not useState(). According to React-Hooks 
  // reference guide, useRef() is useful for more than the ref attribute. 
  // It’s handy for keeping any mutable value around similar to how you’d
  //  use instance fields in classes.

  // This is exactly what we need, a stateful value that won't trigger re-render on each state change. ****

  let throttleTimeout = null

  const callback = () => {
    const currPos = getScrollPosition({ element, useWindow })
    effect({ prevPos: position.current, currPos })
    position.current = currPos
  }

  // In our case, the best choice would be useLayoutEffect, it runs synchronously immediately after React has
  //  performed all DOM mutations. This can be useful if you need to make DOM measurements (like getting the 
  //   scroll position or other styles for an element) and then make DOM mutations or trigger a synchronous 
  //   re-render by updating the state.

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callback, wait)
        } else {
          callback()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)
}