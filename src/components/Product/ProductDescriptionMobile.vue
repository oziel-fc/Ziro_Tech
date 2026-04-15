<script setup lang='ts'>
    import { computed } from 'vue';
    import { useProduct } from '../../utils/useProductStore';
    import { extractTechnicalSpecs } from '../../utils/utils';

    const { product } = useProduct()

    const descriptionText = computed(() => {
        if (!product.value) {
            return ''
        }
        if (product.value.shopee?.description) {
            return product.value.shopee?.description
        }
        if (product.value.olx?.description) {
            return product.value.olx?.description
        }
        return ''
    })

    const productImages = computed(() => {
        if (!product.value) {
            return []
        }
        if (product.value.shopee?.images) {
            return product.value.shopee?.images
        }
        if (product.value.olx?.images) {
            return product.value.olx?.images
        }
        return []
    })

    const extractText = (
        firstWord: string,
        finalWord: string,
        targetText: string
    ): string => {

        const lowerText = targetText.toLowerCase()

        const initialIndex = lowerText.indexOf(firstWord.toLowerCase())
        const finalIndex = lowerText.indexOf(finalWord.toLowerCase())

        if (initialIndex === -1 || finalIndex === -1 || initialIndex >= finalIndex) {
            return ""
        }

        // Initial index for example '1' + size of word 
        const startIndex = initialIndex + firstWord.length
        
        return targetText.slice(startIndex, finalIndex).trim()
    }
</script>


<template>
  <section :class="$style.description">
    
    <hr :style="{
        border: 'none',
        height: '1px',
        backgroundColor: '#b3b3b3',
        width: '100%',
        margin: '10px 0'
    }">
        
    <div :class="$style.viewport_description">
        <h2 :id="$style.about_title">SOBRE O PRODUTO</h2>
        <div :class="$style.description_grid">
            
            <div :class="$style.description_text">
                <h3 :class="$style.subtitle">{{ product?.shopee?.name || product?.olx?.name }}</h3>
                <p :style="{ padding: '10px'}">{{ extractText('Produto', 'Especificações', descriptionText) }}</p>
            </div>

            <div :class="$style.description_image">
                <img :src="productImages[1]" alt="Exemplar de Imagem para Descrição">
            </div>
        </div>
        <div :class="$style.description_grid">
            
            <div :class="$style.description_text">
                <h3 :class="$style.subtitle">Especificações Técnicas</h3>
                <li v-for="text in extractTechnicalSpecs(descriptionText)"> 
                {{ text }}
                </li>
            </div>

            <div :class="$style.description_image">
                <img :src="productImages[2]" alt="Exemplar de Imagem para Descrição">
            </div>
        </div>
    </div>
  </section>
</template>


<style module>
.description {
    width: var(--default-page-width);
    color: black;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 50px;
}
.viewport_description {
    max-width: 1220px;
    display: flex;
    align-items: center;
    flex-direction: column;
}
#about_title {
    width: fit-content;
    font-size: 20px;
    margin-bottom: 20px;
}
.subtitle {
    font-size: 30px;
    margin-bottom: 30px;
    text-align: justify;
    padding: 10px;
}
.description_grid {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.description_text {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 25px;
}
.description_image {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.description_image img {
    width: 100%;
    aspect-ratio: 1 / 1 ;
    border-radius: 10px;
}

.description_text p {
    text-align: justify;
}
.description_text li {
    list-style-position: inside;
    text-align: center;
    text-wrap: balance;
}
.description_text li::marker {
    content: "• ";
    color: black;
}
@media (max-width: 1350px) {
    .subtitle {
        font-size: 25px;
    }
    .description_text p, li {
        font-size: 15px;
    }
}
@media (max-width: 1100px) {
    .subtitle {
        margin-bottom: 0px;
    }
}
@media (max-width: 768px) {
    .subtitle {
        font-size: 22px;
    }
}
@media (max-width: 700px) {
    .description {
        padding: 0;
    }
}
@media (max-width: 600px) {
    .subtitle {
        text-align: start;
        font-size: 18px;
    }
    .description_text p, li {
        font-size: 14px;
    }
}
</style>