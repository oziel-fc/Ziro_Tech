<script setup lang='ts'>

</script>


<template>
    <footer :class="$style.footer">
        <div :class="$style.footer_logo">
            <RouterLink :to="'/'">
                <img src="../../../public/ziro_logo.png" alt="Logo Rodapé">
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

        <div :class="$style.contacts">
            <h2>Contatos</h2>
            <div :class="$style.contacts_icon">
                <a href="https://github.com/oziel-fc/Ziro_Tech" target="_blank" rel="noopener noreferrer">
                    <img src="../../assets/contacts/github.png" alt="Link do Repositório">
                </a>
                <a href="https://www.linkedin.com/in/oziel-felipe/" target="_blank" rel="noopener noreferrer">
                    <img src="../../assets/contacts/linkedin.png" alt="Link do Perfil do Linkedin">
                </a>
                <a href="https://shopee.com.br/zirotech" target="_blank" rel="noopener noreferrer">
                    <img src="../../assets/contacts/shopee.png" alt="Link para Loja Oficial">
                </a>
            </div>
        </div>

        <div>
            <p :style="{fontSize: '13px', color: '#868686'}">© 2026 Ziro Tech | Developed by Oziel Felipe.</p>
        </div>
    </footer>
</template>


<style module>
.footer {
    width: 100%;
    min-height: 450px;
    background-color: black;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0px 50px;
    margin-top: 50px;
}
.footer_logo {
    height: fit-content;
}
.footer_logo img {
    height: 35px;
}
.about {
    padding-top: 20px;
}
.about h2 {
    font-size: 20px;
}
.about p {
    color: #868686;
    font-size: 14px;
    text-align: justify;
    hyphens: auto;
}
.contacts {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 0px;
}
.contacts h2 {
    font-size: 25px;
    width: fit-content;
    padding-bottom: 15px;
}
.contacts img {
    height: 30px;
}
.contacts div {
    gap: 10px;
}
.contacts_icon {
    display: flex;
    flex-direction: row;
    list-style: none;
    gap: 10px;
}
@media (max-width: 768px) {
    .footer {
        padding: 0px 25px;
    }
    .contacts h2 {
        padding-bottom: 10px;
    }
}
@media (max-width: 550px) {
    .footer {
        padding: 40px 25px;
    }
}
</style>