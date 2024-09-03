//Adicionando os elementos para o html
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/servico');
    if (!response.ok) throw new Error('Erro ao buscar serviços');

    const servicos = await response.json();
    const listaServico = document.getElementById('lista-servicos');

    servicos.forEach(servico => {
      const li = document.createElement('li');
      li.innerHTML = `
              <div class="servicos--item">
                <div class="servicos--box">
                  <img class="servicos--image" src="${servico.imagem_url}" alt="${servico.nome_servico}" />
                  <h2>${servico.nome_servico}</h2>
                </div>
                <p style="text-align: justify;">${servico.descricao}</p>
              </div>`;
      listaServico.appendChild(li);

    });
  } catch (error) {
    console.error(error);
    alert('Erro ao carregar os serviços.');
  }
});