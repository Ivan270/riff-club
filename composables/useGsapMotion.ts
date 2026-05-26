import type { Ref } from 'vue'
import { onScopeDispose } from 'vue'

type GsapModule = typeof import('gsap')
type ScrollTriggerModule = typeof import('gsap/ScrollTrigger')
type Gsap = GsapModule['gsap']
type ScrollTrigger = ScrollTriggerModule['ScrollTrigger']

let gsapPromise: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTrigger }> | null = null

const loadGsap = async () => {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, scrollTriggerModule]) => {
      gsapModule.gsap.registerPlugin(scrollTriggerModule.ScrollTrigger)
      return { gsap: gsapModule.gsap, ScrollTrigger: scrollTriggerModule.ScrollTrigger }
    })
  }

  return gsapPromise
}

const prefersReducedMotion = () => {
  if (!import.meta.client) {
    return true
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const useGsapMotion = () => {
  let disposed = false
  const scopeCleanups: Array<() => void> = []

  const addScopeCleanup = (cleanup: () => void) => {
    scopeCleanups.push(cleanup)

    return () => {
      const index = scopeCleanups.indexOf(cleanup)
      if (index >= 0) {
        scopeCleanups.splice(index, 1)
      }

      cleanup()
    }
  }

  onScopeDispose(() => {
    disposed = true
    scopeCleanups.splice(0).forEach((cleanup) => cleanup())
  })

  const runWhenMotionAllowed = async (
    scope: Ref<HTMLElement | null>,
    setup: (tools: { gsap: Gsap; ScrollTrigger: ScrollTrigger }) => void
  ) => {
    const element = scope.value

    if (!import.meta.client || prefersReducedMotion() || !element) {
      return undefined
    }

    const tools = await loadGsap()
    if (disposed || scope.value !== element) {
      return undefined
    }

    const context = tools.gsap.context(() => setup(tools), element)

    return addScopeCleanup(() => context.revert())
  }

  const bindPressFeedback = async (elements: Element[]) => {
    if (!import.meta.client || prefersReducedMotion() || elements.length === 0) {
      return undefined
    }

    const { gsap } = await loadGsap()
    if (disposed) {
      return undefined
    }

    const cleanups = elements.map((element) => {
      const onPointerDown = () => {
        gsap.to(element, { scale: 0.96, x: 1, y: 1, duration: 0.08, ease: 'power2.out' })
      }
      const onPointerUp = () => {
        gsap.to(element, { scale: 1, x: 0, y: 0, duration: 0.18, ease: 'back.out(2)' })
      }

      element.addEventListener('pointerdown', onPointerDown)
      element.addEventListener('pointerup', onPointerUp)
      element.addEventListener('pointerleave', onPointerUp)
      element.addEventListener('pointercancel', onPointerUp)

      return () => {
        element.removeEventListener('pointerdown', onPointerDown)
        element.removeEventListener('pointerup', onPointerUp)
        element.removeEventListener('pointerleave', onPointerUp)
        element.removeEventListener('pointercancel', onPointerUp)
        gsap.killTweensOf(element)
      }
    })

    return addScopeCleanup(() => cleanups.forEach((cleanup) => cleanup()))
  }

  return {
    bindPressFeedback,
    prefersReducedMotion,
    runWhenMotionAllowed
  }
}
