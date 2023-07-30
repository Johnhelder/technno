const vm = new Vue({
  el: "#app",
  data: {
     produtos: [],
     produto: false,
     carrinho: [],
     carrinhoTotal: 0,
  },
  
  filters:{
    numeroPreco(valor){
      return valor.toLocaleString("pt-BR",{style: "currency", currency: "BRL"})
    }
  },
  methods:{
    fetchProdutos(){ 
    fetch("./api/produtos.json")
    .then(r => r.json())
    .then(r =>{
      this.produtos = r;
    })
  },
  abrirModal(id){
    this.fetchProduto(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  },

  fecharModal({target, currentTarget}){
    if(target === currentTarget) this.produto = false;
  },
  adicionarItem(event){
    this.produto.estoque--;
    const {id, nome, preco} = this.produto;
    this.carrinho.push({id, nome, preco});
  },
  removerItem(index){
    this.carrinho.splace(index,1);
  },
  fetchProduto(id){
fetch(`./api/produtos/${id}/dados.json`)
.then(r => r.json())
.then(r =>{
  this.produto = r;
})
  }
  },
  created(){
    this.fetchProdutos();
  }
})