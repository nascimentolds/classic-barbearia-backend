
  // DADOS DO USUARIO PARA LOGIN
  
  document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
      usuario: document.getElementById("usuario").value,
      senha: document.getElementById("senha").value,
    };

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      alert("Autenticado com sucesso");
      window.location.href('/')
    } else {
      alert(result.message || "Erro ao autenticar.");
    }
  });

 