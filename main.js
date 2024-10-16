document.getElementById('procurarCamisa').addEventListener('click', procurarCamisa);
document.getElementById('adicionarCarrinho').addEventListener('click', adicionarCarrinho);
document.getElementById('removerCarrinho').addEventListener('click', removerCarrinho);
document.getElementById('ordenarCarrinho').addEventListener('click', ordenarCarrinho);



let estoqueCamisa = [
    { nome: "camiseta preta", preço: 52.20, quantidade: 60 },
    { nome: "camiseta verde", preço: 32.10, quantidade: 15 },
    { nome: "camiseta vermelha", preço: 48.90, quantidade: 70 },
    { nome: "camiseta azul", preço: 65.70, quantidade: 20 },
    { nome: "camiseta branca", preço: 39.40, quantidade: 50 },
    { nome: "camiseta amarela", preço: 45.00, quantidade: 30 },
    { nome: "camiseta cinza", preço: 40.00, quantidade: 40 },
    { nome: "camiseta rosa", preço: 42.50, quantidade: 25 },
    { nome: "camiseta roxa", preço: 55.50, quantidade: 10 },
    { nome: "camiseta laranja", preço: 30.10, quantidade: 20 }
];

let carrinho = []
let carrinhoPreço = []

let indice = null

function procurarCamisa(event) {
    event.preventDefault()

    const produtoInput = document.getElementById("produtoProcurado").value.toLowerCase();
    const produtoEncontrado = estoqueCamisa.find(item => item.nome === produtoInput);

    if (produtoEncontrado) {
        document.getElementById("mensagemForm").innerHTML = `<strong>Produto encontrado</strong>`;
        indice = estoqueCamisa.indexOf(produtoEncontrado);
    } else {
        document.getElementById("mensagemForm").innerHTML = `<strong>Produto não encontrado</strong>`;
        indice = null
    }
}


function adicionarCarrinho(event){
    event.preventDefault()

        document.getElementById("mensagemForm").innerHTML = ``

        if (estoqueCamisa[indice].quantidade > 0){

            carrinho.push({
                nome: estoqueCamisa[indice].nome,
                preço: estoqueCamisa[indice].preço
            })

            carrinhoPreço.push(estoqueCamisa[indice].preço)
            document.getElementById("itensCarrinho").innerHTML = carrinho.map(item => `${item.nome} | R$${item.preço.toFixed(2)}`).join('<br>')
        
            estoqueCamisa[indice].quantidade -= 1
        
            let saldo = 0
            carrinhoPreço.forEach((preço) => {
                saldo += preço
            });
            document.getElementById("saldoCarrinho").innerHTML = `Total: R$${saldo.toFixed(2)}`

        }else{
            alert("Não temos mais esse item no estoque")
        }
}

function removerCarrinho(event){
    event.preventDefault()

    carrinho.pop()
    carrinhoPreço.pop()
    atualizar()
}

function atualizar() {
    let itensCarrinhoElement = document.getElementById("itensCarrinho");
    

    itensCarrinhoElement.innerHTML = carrinho.map(item => `${item.nome} | R$${item.preço.toFixed(2)}`).join('<br>')
    
    let saldo = 0
    carrinho.forEach(item => {
        saldo += item.preço
    });
    
  
    document.getElementById("saldoCarrinho").innerHTML = `Total: R$${saldo.toFixed(2)}`
}

function ordenarCarrinho(){

    let itensCarrinhoElement = document.getElementById("itensCarrinho");
    itensCarrinhoElement.innerHTML = ""

    carrinho.sort((a, b) => a.preço - b.preço);
    
    for (i=0; i < carrinho.length; i++){
        itensCarrinhoElement.innerHTML += `${carrinho[i].nome} | R$${carrinho[i].preço.toFixed(2)}<br>`;
    }

}

atualizar()