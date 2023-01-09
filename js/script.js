let comida = null
let bebida = null
let sobremesa = null
let nome = null
let endereço = null

const formataMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',

});

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
    nome = prompt("Seu nome:");
    endereço = prompt("Seu endereço:");
    abreModal();
}
//abre o modal com a confirmação dos pedidos após o cliente selecionar o que deseja pedir
function abreModal(){
    document.getElementById("confirma-comida").innerHTML = `<div>${comida.children[1].children[0].innerHTML}</div><div>${comida.dataset.price.replace("." , ",")}</div>`;
    document.getElementById("confirma-bebida").innerHTML = `<div>${bebida.children[1].children[0].innerHTML}</div><div>${bebida.dataset.price.replace("." , ",")}</div>`;
    document.getElementById("confirma-sobremesa").innerHTML = `<div>${sobremesa.children[1].children[0].innerHTML}</div><div>${sobremesa.dataset.price.replace("." , ",")}</div>`;
    document.getElementById("valor-total").innerHTML = `<div>TOTAL</div><div>${totalPedido()}</div>`
    document.getElementById("modal-confirmacao").style.display = "flex";
}
//fecha o modal após o cliente cancelar o pedido, o redirecionando para poder pedir novamente
function fechaModal(){
    document.getElementById("modal-confirmacao").style.display = "none";
}
//cria a mensagem que irá ser enviada pelo whatsapp após o cliente confirmar os dados
function pedidoWhatsapp() {
    let mensagem = encodeURIComponent(`Olá, gostaria de fazer o pedido: 
- Prato: ${comida.children[1].children[0].innerHTML}
- Bebida: ${bebida.children[1].children[0].innerHTML}
- Sobremesa: ${sobremesa.children[1].children[0].innerHTML}
Total: ${totalPedido()}
    
Nome: ${nome}
Endereço: ${endereço}`);
    window.location.href = `https://wa.me/5555555555555?text=${mensagem}`
}
//contabiliza em R$ o valor total da compra que foi feita no aplicativo pelo cliente
function totalPedido() {
    return formataMoeda.format(parseFloat(comida.dataset.price) + parseFloat(bebida.dataset.price) + parseFloat(sobremesa.dataset.price));
}