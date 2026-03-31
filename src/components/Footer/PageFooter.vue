<script setup lang='ts'>
import { RouterLink } from 'vue-router';


</script>


<template>
    <footer :class="$style.footer">
        <div :class="$style.viewport_footer">
            <div :class="$style.footer_logo">
                <RouterLink :to="'/'">
                    <img src="../../../public/ziro_logo.png" alt="Logo do Rodapé">
                </RouterLink>
            </div>

            <div :class="$style.about" >
                <h2>Sobre o projeto</h2>
                <p>
                    Este projeto de e-commerce foi desenvolvido apenas para fins educativos e de portfólio, com o objetivo de demonstrar habilidades em desenvolvimento, design e consumo de dados.
                    Os produtos e a loja apresentados são reais, porém a aplicação não realiza vendas diretamente. Ao selecionar um produto, o usuário será redirecionado para a loja oficial para concluir a compra.
                    Este projeto não possui vínculo comercial direto com a loja, sendo apenas uma vitrine demonstrativa.
                </p>
            </div>

            <div :class="$style.contacts_container">
                <h1>Contato</h1>
                <a href="https://www.linkedin.com/in/oziel-felipe/" target="_blank" rel="noopener noreferrer">
                    <p>LinkedIn</p>
                </a>
                <a href="https://github.com/oziel-fc/Ziro_Tech" target="_blank" rel="noopener noreferrer">
                    <p>Github</p>
                </a>
                <a href="https://shopee.com.br/zirotech" target="_blank" rel="noopener noreferrer">
                    <p>Loja Oficial</p>
                </a>
            </div>
        </div>

        <div>
            <p :style="{fontSize: '12px', color: '#868686'}">© 2026 Ziro Tech | Developed by Oziel Felipe.</p>
        </div>
    </footer>
</template>


<style module>
.footer {
    width: 100%;
    height: 20vh;
    margin-top: 60px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.viewport_footer {
    width: var(--default-page-width);
    height: 80%;
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footer_logo {
    height: fit-content;
}
.footer_logo img {
    height: 45px;
}
.about {
    height: 100%;
    width: 40%;
    padding-top: 15px;
}
.about h2 {
    font-size: 16px;
    margin-bottom: 5px;
}
.about p {
    color: #868686;
    font-size: 12px;
    text-align: justify;
}
.contacts {
    display: flex;
    gap: 10px;
    flex-direction: row;
}
.contacts a {
    display: block;
    height: 30px;
    width: 30px;
}
.contacts img {
    width: 100%;
}
#store {
    display: flex;
    text-decoration: none;
    color: inherit;
    align-items: center;
    
}
.contacts_container {
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 15px;
}
.contacts_container a {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    color: inherit;
}
.contacts_container h1 {
    font-size: 20px;
}
.contacts_container h2 {
    font-size: 20px;
}
.contacts_container a[href^='http']::after {
    position: relative;
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-left: 0.25em;
    background-size: 100%;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABcUlEQVR4nO2YwU7DMAyG8xzjzLswLpzQDrwgHHilITE0DhNS7d85gSjKxqVry+o0TYLkX8opqv1/kRsncc5kMpmqFRFdE+SZIcyQVjfwQiLrXkyR2zA3NQ4x3pn9XZR5hnzojXeS73pxGW8RcfZ6gNPKtwsA7CLifKsB4sqmU0LbRuSmByCyDnPaeC4CYF4ApQDcE+PzXwLggvmqAQBszs0PwVQJgIGVJ8ZXAzxUD/CXeZci/5IAl8xXDTDFfLUAU81XCaAxH9Q9L2HrSgKMbZUANmPfhI4djh1hDHX0bADalU+mFADFzKcAKGp+LkBx83MAYn7YIYWbW7j8HMfAzW4RgJQrz7m30dRlwzkb2RI1z7kAwotBipovBnB+SU9hPjfAPrX5EiX0enxpiHmAGlF1p9Hs+dkA5okNAAZQHIDOgxQcjRqAWJ4qMN6eGqQ8qgG891cEORQ3Dzl471dqgF+IVaAvVE4UckebN5lMJpdDP/wkICQApe9VAAAAAElFTkSuQmCC");
    transform: translateY(0.25em);
}
</style>
