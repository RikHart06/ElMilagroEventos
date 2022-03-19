var form = document.getElementById("frmContact");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
  status.classList.add("loading");
  status.classList.add("d-block");
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.classList.add("sent-message");
        status.classList.add("d-block");
        status.innerHTML = "Tu mensaje ha sido enviado. ¡Gracias!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.classList.add("error-message");
            status.innerHTML =
              "¡Oops! Algo salió mal. Por favor, utiliza otro medio. Gracias.";
          }
        });
      }
    })
    .catch((error) => {
      status.classList.add("error-message");
      status.classList.add("d-block");
      status.innerHTML =
        "¡Oops! Algo salió mal. Por favor, utiliza otro medio. Gracias.";
    });
}
form.addEventListener("submit", handleSubmit);
