<!-- CategoryItem.vue -->
<script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import { RouterLink } from 'vue-router';
  import { slugify } from '../../utils/slugify';

  type Subcategory = {
    name: string,
    description: string | null
  }

  const props = defineProps<{
    category: string,
    subcategories: Subcategory[],
    index: number
  }>()

  // Function to share the IDs of elements between the components and update the current height of dropdown menu
  const emit = defineEmits(['hoverCaptureId', 'updateHeight']);
  const dropdownMenu = ref<HTMLElement | null>(null);
  const dropdownMenuHeight = ref(0)

  const hoverCapture = async (event) => {
    const targetElement = event.currentTarget;
    const idTargetElement = targetElement.dataset.id
    emit('hoverCaptureId', idTargetElement);

    await nextTick();

    if (dropdownMenu.value) {
      dropdownMenuHeight.value = dropdownMenu.value.offsetHeight;
    }
  }
  const resetHover = () => {
    dropdownMenuHeight.value = 0;
    emit('updateHeight', 0);
};
</script>

<template>
  <li :class="$style.category" 
  :data-id="`${index}`"
  @mouseenter="hoverCapture"
  @mouseleave="resetHover"
  >

    <RouterLink :to="`/${slugify(category)}`">
      <span>{{ category }}</span>
    </RouterLink>

    <div :class="$style.shadow_box" :style="{height: `${dropdownMenuHeight}px`}">
      <ul :class="$style.dropdown_menu" v-if="subcategories.length" ref="dropdownMenu" :style="{bottom: `${dropdownMenuHeight}px`, transform: `translateY(${dropdownMenuHeight}px)`}">
        <li :class="$style.subcategorie" v-for="item in subcategories" :key="item.name">
          <RouterLink :to="`/${slugify(category)}/${slugify(item.name)}`">
            <span>{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </li>
</template>

<style module>
  .category {
    position: relative;
    width: 160px;
    height: 40px;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

  }

  .category span {
    color: white;
  }
  
  /* ul element */
  .dropdown_menu {
    width: 100%;
    position: absolute;
    display: none;
    left: 0;
    z-index: 1001;
    border-top: 2px solid transparent;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .shadow_box {
    top: 100%; 
    width: 100%; 
    overflow: hidden;
    position: absolute;
  }

  .category:hover .dropdown_menu {
    display: flex;
    flex-direction: column;
  }

  .subcategorie {
    height: 35px;
    background-color: #1b1b1b;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .subcategorie:hover {
    background-color: #252525;
  }
  
  .subcategorie span {
    font-size: 13px;
  }
</style>