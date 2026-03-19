<script setup lang="ts">
    import { ensureTrailingColon } from '../../../utils/utils';

    const props = defineProps<{
        variation: Object
        selectedVariation: number
        productImages: string[]
        variationImageIndexes: number[]
        toggleCurrentImage: Function
        toggleSelectedVariation: Function
    }>();
</script>

<template>
  <!-- Variation -->
    <div v-if="Object.keys(variation)[0] != 'None'">
        <div :class="$style.variations" v-for="[typeVariation, variationOptions] in Object.entries(variation)" :key="typeVariation">
            
            
            <span>
                {{ ensureTrailingColon(typeVariation) }}
            </span>
            <span :style="{marginLeft: '5px'}"><strong>{{ variationOptions[selectedVariation] }}</strong></span>
            
            <div :class="$style.variation_option">
                <button v-for="(imageRelatedIndex, optionRelatedIndex) in variationImageIndexes"
                    :class="$style.option"
                    :style="selectedVariation === optionRelatedIndex ? 'border: 2px solid black' : ''"
                    @click="toggleCurrentImage(imageRelatedIndex), toggleSelectedVariation(optionRelatedIndex)">

                    <img :src="productImages[imageRelatedIndex]">
                </button>
            </div>
        </div>
    </div>
</template>

<style module>
.variation_option {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    gap: 5px;
}
.option {
    margin-top: 8px;
    height: 45px;
    width: 45px;
    border-radius: 4px;
    border: 2px solid #b3b3b3;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e3e3e3;
}
.option img {
    width: 100%;
    height: 100%;
}
</style>