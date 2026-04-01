import { ref, computed, onMounted, onUnmounted } from "vue"

export function useIsMobile() {
  const width = ref(window.innerWidth)
  const isTouch = ref(false)

  const isMobile = computed(() => {
    if (width.value <= 1024 || isTouch.value) {
        return true
    }
    else {
        return false
    }
  })

  const updateWidth = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    isTouch.value = window.matchMedia("(pointer: coarse)").matches
    window.addEventListener("resize", updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener("resize", updateWidth)
  })

  return {
    isMobile
  }
}