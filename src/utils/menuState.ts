import { ref } from "vue"

export const isMenuOpen = ref(true)

export const toggleIsOpen = () => {
  isMenuOpen.value = !isMenuOpen.value
}