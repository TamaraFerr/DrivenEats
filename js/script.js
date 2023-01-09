let comida = null
let bebida = null
let sobremesa = null

const formataMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  
});

let clienteNome = prompt("Seu nome, por favor:");
let clienteEndereço = prompt("Agora, seu endereço:");

//seleciona o item do pedido e marca com a borda e check, verifica cada categoria clicada.
function selecionaCard(el) {
    let categoria = el.dataset.test;
    desmarcaCard(categoria);
    switch(categoria){
        case "dish":
            comida = el;
            break;
        case "drink":
            bebida = el;
            break;
        case "dessert":
            sobremesa = el;
            break;
    }
    
    el.classList.add('selected-card');

    podePedir()

}
//tira a classe de quem foi marcado dentro da categoria (comida, bebida, sobremesa)
function desmarcaCard(categoria){
    let selectedCard = document.querySelector(`[data-test="${categoria}"].selected-card`);
    if(selectedCard) {
        selectedCard.classList.remove('selected-card');
    }
}
//habilita o botão de pedido após verificar se todas as categorias foram seleicionadas
function podePedir() {
    if(comida && bebida && sobremesa) {
       let botao = document.getElementById("botao-pedido");
       botao.disabled = false;
       botao.innerHTML = "Fechar pedido";
    }
}
//envia a mensagem de confirmação de pedido pelo whatsapp e adiciona o prompt de nome e endereço ao pedido.
function mandaPedido() {
    let nome = prompt("Seu nome, por favor:");
    let endereço = prompt("Agora, seu endereço:");
    let mensagem = encodeURIComponent(`Olá, gostaria de fazer o pedido: 
-Prato: ${comida.children[1].children[0].innerHTML}
-Bebida: ${bebida.children[1].children[0].innerHTML}
-Sobremesa: ${sobremesa.children[1].children[0].innerHTML}
Total: ${totalPedido()}
    
Nome: ${nome}
Endereço: ${endereço}`);
    window.location.href = `https://wa.me/5555555555555?text=${mensagem}`
    
}

function totalPedido() {
    return formataMoeda.format(parseFloat(comida.dataset.price) + parseFloat(bebida.dataset.price) + parseFloat(sobremesa.dataset.price));
}
