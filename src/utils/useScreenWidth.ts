import { ref, onMounted, onUnmounted } from "vue"

export function useScreenWidth() {
  const screenWidth = ref<number>(window.innerWidth)

  const update = () => {
    screenWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener("resize", update)
  })

  onUnmounted(() => {
    window.removeEventListener("resize", update)
  })

  return { screenWidth }
}