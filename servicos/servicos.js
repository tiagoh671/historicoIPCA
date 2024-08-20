const dados = require('../dados/dados.js')

let historico = dados.historicoInflacao


const buscarHistorico = () =>{
  return historico
}

const filtrarAno = (valorBusca)=>{
  return historico.filter(valor => valor.ano == valorBusca)
}

function calculaIPCA(valor, mesInicial, anoInicial, mesFinal, anoFinal){
  if(isNaN(mesInicial) || isNaN(mesFinal)  || isNaN(anoInicial)  || isNaN(anoFinal)  || isNaN(valor) || mesInicial < 1 || mesInicial > 12 || mesFinal < 1 || mesFinal > 12 || anoInicial > anoFinal || (mesInicial > mesFinal && anoInicial >= anoFinal)){
    return false
  } else {
    
  let dadosFiltrados = historico.filter(dado => dado.ano >=anoInicial && dado.ano <= anoFinal &&
    dado.mes >= mesInicial && dado.mes <= mesFinal
  )

  let soma = valor

  for (item of dadosFiltrados){
    soma *= 1 + (item.ipca / 100)
  }

  console.log(soma)

  return parseFloat(soma).toFixed(2)
}
}

function buscarId(id){
  return historico.find(valor => valor.id === id)
}

exports.buscarId = buscarId
exports.buscarHistorico = buscarHistorico
exports.filtrarAno = filtrarAno
exports.calculaIPCA = calculaIPCA