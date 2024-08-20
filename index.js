const express = require('express')
const servicos = require('./servicos/servicos.js')

const app = express()


app.get('/historicoIPCA',(req, res) =>{
  
  const valorBusca = req.query.ano
  const resultado = valorBusca ? servicos.filtrarAno(valorBusca) : servicos.buscarHistorico()

  if(resultado.length > 0) {
    res.json(resultado)
  } else{
    res.status(404).send()
  }

})


app.get('/historicoIPCA/calculo',(req, res) =>{
  const valor = parseInt(req.query.valor)
  const mesInicial = parseInt(req.query.mesInicial)
  const anoInicial = parseInt(req.query.anoInicial)
  const mesFinal = parseInt(req.query.mesFinal)
  const anoFinal = parseInt(req.query.anoFinal)

  if (servicos.validacaoErro(valor, mesInicial, anoInicial, mesFinal, anoFinal)) {
    res.status(400).json({ erro: 'Parâmetros inválidos' });
    return;
  }


  const resultado = servicos.calculaIPCA(valor, mesInicial, anoInicial, mesFinal, anoFinal)
  res.json({'resultado' : resultado})
  
})

app.get('/historicoIPCA/:id',(req,res)=>{
  const id = parseInt(req.params.id)

  const idEncontrado = servicos.buscarId(id)

  if(idEncontrado){
    res.json(idEncontrado)
  } else{
    res.status(404).json({'Erro': 'ID não encontrado'})}

})


app.listen('8080', ()=>{
  let data = new Date()
  console.log(`Servidor iniciado em ${data}`)
})
