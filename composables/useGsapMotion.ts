import type { Ref } from 'vue'
import { onScopeDispose } from 'vue'

type GsapModule = typeof import('gsap')
type ScrollTriggerModule = typeof import('gsap/ScrollTrigger')
type Gsap = GsapModule['gsap']
type ScrollTrigger = ScrollTriggerModule['ScrollTrigger']
type MotionCleanup = () => void
type MotionTools = { gsap: Gsap; ScrollTrigger: ScrollTrigger }

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

  const bindWhenMotionAllowed = async (
    start: (isCurrent: () => boolean) => Promise<MotionCleanup | undefined>
  ) => {
    if (!import.meta.client || disposed) {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let activeCleanup: MotionCleanup | undefined
    let bindingDisposed = false
    let generation = 0

    const stopActive = () => {
      generation += 1
      activeCleanup?.()
      activeCleanup = undefined
    }

    const startActive = async () => {
      if (bindingDisposed || disposed || mediaQuery.matches || activeCleanup) {
        return
      }

      const currentGeneration = ++generation
      const isCurrent = () => (
        !bindingDisposed
        && !disposed
        && !mediaQuery.matches
        && generation === currentGeneration
      )
      const cleanup = await start(isCurrent)

      if (!isCurrent()) {
        cleanup?.()
        return
      }

      activeCleanup = cleanup
    }

    const onPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stopActive()
        return
      }

      void startActive()
    }

    const cleanupBinding = () => {
      if (bindingDisposed) {
        return
      }

      bindingDisposed = true
      mediaQuery.removeEventListener('change', onPreferenceChange)
      stopActive()
    }

    mediaQuery.addEventListener('change', onPreferenceChange)
    const removeScopeCleanup = addScopeCleanup(cleanupBinding)

    try {
      await startActive()
    } catch (error) {
      removeScopeCleanup()
      throw error
    }

    return removeScopeCleanup
  }

  const runWhenMotionAllowed = async (
    scope: Ref<HTMLElement | null>,
    setup: (tools: MotionTools) => void | MotionCleanup
  ) => {
    if (!import.meta.client) {
      return undefined
    }

    return bindWhenMotionAllowed(async (isCurrent) => {
      const element = scope.value
      if (!element) {
        return undefined
      }

      const tools = await loadGsap()
      if (!isCurrent() || scope.value !== element) {
        return undefined
      }

      let setupCleanup: MotionCleanup | undefined
      const context = tools.gsap.context(() => {
        setupCleanup = setup(tools)
      }, element)

      return () => {
        setupCleanup?.()
        context.revert()
      }
    })
  }

  const bindPressFeedback = async (elements: Element[]) => {
    if (!import.meta.client || elements.length === 0) {
      return undefined
    }

    return bindWhenMotionAllowed(async (isCurrent) => {
      const { gsap } = await loadGsap()
      if (!isCurrent()) {
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
          gsap.set(element, { clearProps: 'transform' })
        }
      })

      return () => cleanups.forEach((cleanup) => cleanup())
    })
  }

  return {
    bindPressFeedback,
    prefersReducedMotion,
    runWhenMotionAllowed
  }
}
