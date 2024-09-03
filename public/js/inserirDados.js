//Levando os dados para o BD

document
  .getElementById("servicoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
      nome: document.getElementById("nome").value,
      imagem: document.getElementById("imagem").value,
      descricao: document.getElementById("descricao").value,
    };

    const response = await fetch("/criarservico", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      alert("Serviço criado com sucesso");
      window.location.href = "/servicos";
    } else {
      alert("Erro ao criar serviço.");
    }
  });

  
  window.onload = function() {
    fetch("/checkAuth")
      .then(response => response.json())
      .then(data => {
        if (data.isAuthenticated) {
          document.getElementById("loginLink").style.display = "none";
          document.getElementById("adminLink").style.display = "block";
        } else {
          document.getElementById("loginLink").style.display = "block";
          document.getElementById("adminLink").style.display = "none";
        }
      });
  };