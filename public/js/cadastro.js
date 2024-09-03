//LEVANDO OS DADOS DO USUARIO PARA O BD
document
  .getElementById("userForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
      usuario: document.getElementById("usuario").value,
      senha: document.getElementById("senha").value,
    };

    const response = await fetch("/criarLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log("Requisição feita")

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      alert("Conta criada com sucesso");
      window.location.href = '/login';
    } else {
      alert(result.message || "Erro ao criar conta.");
    }
  });