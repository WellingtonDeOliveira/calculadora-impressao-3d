import { getParams, saveParams, getCSV } from './storage.js'

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN

btnLogin.onclick = async () => {
  if (user.value === ADMIN_USER && token.value === ADMIN_TOKEN) {
    document.getElementById('loginCard').remove()
    panel.hidden = false
    await carregar()
  } else {
    alert('Login inválido')
  }
}

btnSalvar.onclick = () => {
  saveParams({
    filamento: +filamento.value,
    watts: +watts.value,
    energia: +energia.value,
    lucro: +lucro.value
  })
  alert('Parâmetros salvos')
}

async function carregar() {
  const p = await getParams()
  filamento.value = p.filamento
  watts.value = p.watts
  energia.value = p.energia
  lucro.value = p.lucro

  const csv = getCSV()
  if (!csv) return

  const linhas = csv.split('\n').slice(1)
  tabela.innerHTML = `
    <tr>
      <th>Nome</th><th>Filamento</th><th>Horas</th><th>Custo</th><th>Preço</th>
    </tr>
  `

  linhas.forEach(l => {
    if (!l) return
    const c = l.split(',')
    tabela.innerHTML += `<tr>${c.map(v => `<td>${v}</td>`).join('')}</tr>`
  })
}
