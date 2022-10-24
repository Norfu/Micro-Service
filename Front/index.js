const insertUser = () => {
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const address = document.getElementById('address')

    let body = {
        email:email.value,
        password:password.value,
        sold:0,
        adress:address.value
    }

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(body)
      }).then(res => {
        return res.text()
      }).then(function(data){
        document.getElementById('error').innerHTML = data
      })
}
