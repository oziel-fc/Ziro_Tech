<template>
  <div :class="$style.product_header">
    <div :class="$style.product_images">
        <div :class="$style.current_image">
            
        </div>
        <div :class="$style.thumbnail_images">

        </div>
    </div>
    <div :class="$style.product_info">

    </div>
  </div>
</template>

<script setup>

</script>

<style module>
.product_header {
    width: var(--default-page-width);
    display: flex;
    flex-direction: column;
}
.product_images {
    width: 50%;
    height: 500px;
    background-color: antiquewhite;
}
</style>