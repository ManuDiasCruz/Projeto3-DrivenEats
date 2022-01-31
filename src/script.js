let prato, bebida, sobremesa = null;
let precoPrato, precoBebida, precoSobremesa = 0;


function selecionarPrato(itemSelecionado){
    prato = pegaNome(itemSelecionado);
    precoPrato = pegaPreco(itemSelecionado);
    
    // Esse for serve para procurar se há algum prato selecionado, se tiver ele desmarca
    let pratos = document.querySelectorAll(".prato");
    for (let i=0; i<pratos.length; i++){
        pratos[i].classList.remove("artigoSelecionado");
    }
    // Aqui é marcado o prato atual como selecionado
    itemSelecionado.classList.toggle("artigoSelecionado");

    ativarBotao();
}

function selecionarBebida(itemSelecionado){
    bebida = pegaNome(itemSelecionado);
    precoBebida = pegaPreco(itemSelecionado);

    // Esse for serve para procurar se há alguma bebida selecionado, se tiver ele desmarca
    let bebidas = document.querySelectorAll(".bebida");
    for (let i=0; i<bebidas.length; i++){
        bebidas[i].classList.remove("artigoSelecionado");
    }
    // Aqui é marcada a bebida atual como selecionado
    itemSelecionado.classList.toggle("artigoSelecionado");

    ativarBotao();
}

function selecionarSobremesa(itemSelecionado){
    sobremesa = pegaNome(itemSelecionado);
    precoSobremesa = pegaPreco(itemSelecionado);

    // Esse for serve para procurar se há alguma sobremesa selecionado, se tiver ele desmarca
    let sobremesas = document.querySelectorAll(".sobremesa");
    for (let i=0; i<sobremesas.length; i++){
        sobremesas[i].classList.remove("artigoSelecionado");
    }
    // Aqui é marcada a sobremesa atual como selecionado
    itemSelecionado.classList.toggle("artigoSelecionado");

    ativarBotao();
}


// Função usada para montar o pedido do cliente
function criarPedido(){
    if ((prato!=null)&&(bebida!=null)&&(sobremesa!=null)){
        let totalConta = formatarPreco(precoPrato+precoBebida+precoSobremesa);
        let mensagem = montarMsg(totalConta);
        enviarMsgWhatsApp("+5583999999999", mensagem);
    }
}

// Função para alterar a forma do botão de encerramento do pedido, aparecendo ativado
function ativarBotao() {
    const botao = document.querySelector("button");
    if ((prato!=null)&&(bebida!=null)&&(sobremesa!=null)){
        botao.classList.remove("botao");
        botao.classList.add("botaoSelecionado");
        botao.innerHTML = "Fechar pedido";
    }
}

// Função para abrir uma janela de conversa com o WhatsApp do DrivenEats
function enviarMsgWhatsApp(telefone, mensagem){
    window.open("https://wa.me/" + telefone + "?text=" + mensagem);
}

// Função para montar texto da mensagem com o pedido
function montarMsg(totalGasto){    
    let mensagem = "Olá, gostaria de fazer o pedido:\n- Prato: " + prato + "\n- Bebida: " + bebida + "\n- Sobremesa: " + sobremesa + 
                   "Total: " + totalGasto;
    return mensagem;
}

// Função para procurar a tag 'nome' e retornar seu texto dentre os elementos do parâmetro 'item'
function pegaNome(item){
    const nome = item.querySelector(".nome").innerHTML;
    return nome;
}

// Função para procurar a tag 'preco' e retornar seu valor numérico dentre os elementos do parâmetro 'item'
function pegaPreco(item){
    let aux = item.querySelector(".preco").innerHTML.replace("R$ ", "");
    aux = aux.replace(".", "");
    aux = aux.replace(",", ".");
    const valor = parseFloat(aux);
    return valor;
}

// Função usada para converter o total de gasto de float para uma string com R$
function formatarPreco(valor){
    let stringPreco = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return stringPreco;
}