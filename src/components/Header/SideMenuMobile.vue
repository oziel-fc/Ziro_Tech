<script setup lang='ts'>
  import descriptionCategories from '../../data/descriptionCategories';
  import { ref, watchEffect } from 'vue';
  import { slugify } from '../../utils/utils';

  const isOpen = ref(true)
  const toggleIsOpen = () => {
    isOpen.value = !isOpen.value
  }

  const active = ref(null)

  const toggle = (name) => {
    if (active.value === name) {
      active.value = null
    } else {
      active.value = name
    }
  }
  
  watchEffect(() => {
    console.log('isOpen', isOpen.value)
  })
</script>


<template>
  <div :class="[$style.sideMenu, !isOpen && $style.close]">
    <div :id="$style.topMenu">
      <RouterLink :to="'/'">
        <img src="../../../public/ziro_logo.png" alt="Logo do Menu Lateral">
      </RouterLink>
      <button
        @click="toggleIsOpen()">
        <img src="../../assets/close.png" alt="Botão de Fechar">
      </button>
    </div>
    <h3>CATEGORIAS</h3>
    
    <div :id="$style.hLine">
      <hr>
    </div>

    <ul :class="$style.listOfCategories">
      <li 
        :class="$style.category"
        v-for="(item, index) in descriptionCategories"
        :key="index"
        :style="{
          backgroundColor: active === item.category.name 
            ? '#252525'
            : '#1b1b1b'
        }"
      >
        <div :class="$style.vw_category" 
          @click="toggle(item.category.name)"
          >
          <span>{{ item.category.name }}</span>
          <img src="../../assets/arrow_white.png" alt="Seta Indicativa"
            :style="{
              transform: active === item.category.name ? 'scaleY(-1)' : 'scaleY(1)'
            }">
        </div>

        <div 
          v-if="active === item.category.name"
          :class="$style.listOfSubcategories"

        >
          <ul>
            <li 
              v-for="sub in item.subcategories"
              :key="sub.name"
              :class="$style.subcategory"
            >
              <RouterLink :to="`/${slugify(item.category.name)}/${slugify(sub.name)}`">
                {{ sub.name }}
              </RouterLink>
            </li>
            <li :class="$style.subcategory">
              Ver Todos
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>


<style module>
.sideMenu {
  height: 100vh;
  z-index: 1001;
  width: 300px;
  position: absolute;
  background-color: #1b1b1b;
  left: 0;
  border-right: 1px solid #252525;
  transition: 0.3s ease;
}
.close {
  transform: translateX(-100%);
}
#topMenu {
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 10px 20px 20px;
}
#topMenu img {
  height: 30px;
}
#hLine {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#hLine hr {
  width: 90%;
  border-width: medium;
  border-style: none;
  border-color: currentcolor;
  border-image: initial;
  height: 1px;
  background-color: #252525;
}
.sideMenu h3 {
  font-size: 13px;
  font-weight: 400;
  padding: 10px 16px;
}
.vw_category {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.category {
  padding: 8px 16px;
}
.category img {
  height: 20px;
}
.subcategory {
  padding: 8px 16px;
}
</style>