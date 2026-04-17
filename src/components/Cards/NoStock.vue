<script setup lang='ts'>
    
</script>


<template>
  <div :class="$style.noStock">
        <span>Oops!</span>
        <span>Estes produtos estão temporariamente sem estoque.</span>
        <img src="../../assets/box.png" alt="Caixa Vazia" 
            draggable="false" 
            @dragstart.prevent
            @contextmenu.prevent
            >
    </div>
</template>


<style module>
.noStock {
    color: black;
    width: var(--default-page-width);
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 80px;
}
.noStock span {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
}
.noStock img {
    width: 100px;
    margin-top: 20px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
}

@media (max-width: 500px) {
    .noStock span {
        font-size: 18px;
    }
}
@media (max-width: 400px) {
    .noStock span {
        font-size: 16px;
    }
}
</style>