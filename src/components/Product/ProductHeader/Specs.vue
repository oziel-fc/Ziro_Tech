<script setup lang='ts'>
    import { computed } from 'vue';
import { useScreenWidth } from '../../../utils/useScreenWidth';
    const props = defineProps<{
        specs: string | string[]
    }>()

    const { screenWidth } = useScreenWidth()

    const limitOfLiElements = computed(() => {
        if (screenWidth.value < 1350) {
            return 6
        }
        else {
            return 11
        }
    })
</script>


<template>
  <div :class="$style.viewport_specs">
        <span>O que você precisa saber sobre este produto:</span>
        <ul>
            <li v-for="(spec, index) in specs.slice(0, limitOfLiElements)" :key="index">
                {{ spec }}
            </li>
        </ul>
    </div>
</template>


<style module>
/* Specs */
.viewport_specs {
    width: 100%;
    height: 300px;
    /* border: 1px solid red; */
    margin-top: 10px;
    overflow: hidden;
}
.viewport_specs span {
    font-weight: 700;
}
.viewport_specs ul {
    margin-top: 5px;
}
.viewport_specs li {
    list-style-position: inside;
}
.viewport_specs li::marker {
  content: "• ";
  color: black;
}
@media (max-width: 1350px) {
    .viewport_specs {
        height: 230px;
    }
}
</style>