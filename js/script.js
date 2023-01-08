let comida = null
let bebida = null
let sobremesa = null

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