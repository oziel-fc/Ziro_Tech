<script setup lang='ts'>
    const props = defineProps<{
        specs: string | string[]
    }>()
</script>


<template>
  <div :class="$style.viewport_specs">
        <span>O que você precisa saber sobre este produto:</span>
        <ul>
            <li v-for="(spec, index) in specs.slice(0, 12)" :key="index">
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
</style>