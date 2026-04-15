import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function getWidthOf(elementRef: Ref<HTMLElement | null | undefined>) {
  const width = ref<number>(0)
  let observer: ResizeObserver | null = null

  onMounted(() => {
    observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const entry = entries[0]
      if (!entry) return

      width.value = entry.contentRect.width
    })

    if (elementRef.value) {
      observer.observe(elementRef.value)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return width
}