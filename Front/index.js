const insertUser = () => {
  const email = document.getElementById('email')
  const password = document.getElementById('password')
  const address = document.getElementById('address')

  let body = {
    email: email.value,
    password: password.value,
    sold: 0,
    adress: address.value
  }

  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => {
    return res.text()
  }).then(function (data) {
    document.getElementById('error').innerHTML = data
  })
}

const getProduct = () => {
  fetch('http://localhost:7777/products', {
    method: "GET",
    header: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    }).then(data => {
      console.log(data)
      data.map(product => {
        const markup = `${product.name} : ${product.price} € by ${product.society}`
        let productElement = document.createElement('li');
        productElement.innerHTML = markup;
        let buyButton = document.createElement('button');
        buyButton.innerText = "Achetez !";
        buyButton.addEventListener('click', function (event) {
          getOrder(product)
        })
        productElement.appendChild(buyButton);
        document.getElementById('product').appendChild(productElement);


      })
    })
}

const getOrder = (product) => {
  fetch("http://localhost:5000/order/new", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  }).then(res => {
    return res.text()
  }).then(function (data) {
    document.getElementById('error').innerHTML = data
  })
}
      