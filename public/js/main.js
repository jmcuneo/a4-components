
const submit = async function( event ) {
  if (confirm("Do you want to submit your name?")) {
    event.preventDefault()

    const input = document.querySelector("#yourname"),
        json = {"yourname": input.value},
        body = JSON.stringify(json)

    const response = await fetch("/submit", {
      method: "POST",
      body
    })
    const text = await response.text()
    console.log("text:", text)
    confirm("Welcome to join us " + input.value + "!");
  }
}



const logout = async function(event) {
  window.location.href = '/index.html'
  await fetch('/popstate', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
}


  window.onload = async function () {
    const btnLogOut = document.getElementById('logout');
    btnLogOut.onclick = await logout;
  }

