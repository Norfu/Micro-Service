
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
        if(localStorage.getItem("user")){

          let buyButton = document.createElement('button');
          buyButton.innerText = "Achetez !";
          buyButton.addEventListener('click', function (event) {
            setOrder(product)
          })
          productElement.appendChild(buyButton);

        }
       
        document.getElementById('product').appendChild(productElement);


      })
    })
}


const auth = () =>{
  fetch("http://localhost:3000/auth", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  }).then(res => {
    return res.text()
  }).then(function (data) {
    localStorage.setItem("user",data);
    window.location.replace("productPage.html");
  }).catch(err => {
    console.log(err);
  })
}

const getSignedIn = () =>{
  const user = localStorage.getItem("user");
  let balise = document.createElement('li');
  let balise2 = document.createElement('li');
  if(user){
    let userJsoned = JSON.parse(user);
    balise.innerText = `Bonjour ${userJsoned.email}`;
    balise2.innerText = `Votre solde est de :${userJsoned.sold}`
    let link = document.createElement('button');
    link.innerText = 'Se déconnecter';
    link.addEventListener("click",() =>{
      localStorage.setItem("user", "")
      window.location.replace("SignIn.html")
    })
    balise.appendChild(link);
  }else{
    let link = document.createElement('a');
    link.setAttribute('href','SignIn.html')
    link.innerText = 'Se connecter' 
    balise.appendChild(link);   
  }
  document.getElementById("menu").appendChild(balise);
  document.getElementById("menu").appendChild(balise2);

}
const loadOnProductPage = () =>{
  getProduct();
  getSignedIn();
}

const setOrder = (product) =>{
  let user = localStorage.getItem("user");
  userParsed = JSON.parse(user);
  
  fetch("http://localhost:5000/order/new", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({      
      UserID:userParsed._id,
      ProductID: product._id,
      buyDate : Date.now(),
      Sold :product.price,
      soldUser : userParsed.sold
    })
  }).then(res => {    
    user.sold = user.sold - product.price;
    localStorage.setItem("user",user);
    console.log(res);
    return res.text()
  }).catch(err => {
    console.log(err)
  })
}

const getOrder = () => {
   
    fetch('http://localhost:5000/orders', {
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      }).then(data => {
        console.log(data)
        if(localStorage.getItem("user")){
        
        data.map(order => {
          fetch(`http://localhost:7777/product/${order.ProductID}`)
          .then(res => res.json())
          .then(dataProduct =>{
            console.log(dataProduct);
            const nameProduct = dataProduct.name;
            const markup = `${nameProduct}, ${order.buyDate}`
          let productElement = document.createElement('li');
          productElement.innerHTML = markup;
          document.getElementById("orders").appendChild(productElement);

          })
          
          
        }
          )}
    }
  )}

  const loadOnOrderPage = () =>{
    getOrder();
    getSignedIn();
  }