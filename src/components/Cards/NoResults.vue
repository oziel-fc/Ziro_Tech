<script setup lang='ts'>
    
</script>


<template>
  <div :class="$style.noResults">
        <span>Oops!</span>
        <span>Não encontramos nenhum produto deste tipo!</span>
        <img src="../../assets/box.png" alt="Caixa Vazia" 
            draggable="false" 
            @dragstart.prevent
            @contextmenu.prevent
            > 
        <div :class="$style.help">
            <span>Vamos tentar de outro jeito?</span>
            <ul>
                <li>Confira se escreveu certo o termo que tentou buscar</li>
                <li>Use termos mais genéricos ou palavras-chave</li>
                <li>Procure por uma palavra parecida ou sinônimo</li>
            </ul>
            
        </div>
    </div>
</template>


<style module>
.noResults {
    color: black;
    width: var(--default-page-width);
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 50px;
}
.noResults span {
    font-size: 22px;
    font-weight: 800;
    text-align: left;
}
.noResults img {
    width: 100px;
    margin-top: 20px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
}
.noResults ul {
    padding-top: 20px;
    padding-left: 20px;
}
.noResults li {
    font-size: 15px;
    list-style: disc;
}
.help {
    padding-top: 20px;
}

@media (max-width: 500px) {
    .noResults span {
        font-size: 18px;
    }
}
@media (max-width: 400px) {
    .noResults span {
        font-size: 16px;
    }
    .noResults ul {
        padding-left: 16px;
    }
    .noResults li {
        font-size: 14px;
    }
}
</style>