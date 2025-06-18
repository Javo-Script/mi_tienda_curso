const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const productsPath = path.join(__dirname, 'products.json')
const usersPath = path.join(__dirname, 'users.json')

const getData = (dataPath) => {
    const productsPath = path.join(__dirname, `${dataPath}.json`)
    const data = fs.readFileSync(productsPath, 'utf-8')
    return JSON.parse(data)
}

app.get('/', (req, res) =>{
    res.send('API funcionando correctamente')
})

/* PRODUCTS PATHS */
app.get('/products', (req, res) => {
    const products = getData('products')
    res.json(products)
})

app.get('/products/:id', (req, res) => {
    const products = getData('products')
    const id = Number(req.params.id)
    const product = products.find(item => {item.id === id})
    product ? res.json(product) : res.status(404).send("No se encontro el producto")
})

app.post('/products', (req, res) => {
    const products = getData('products')
    const newProduct = {id : products.length + 1, ...req.body}
    products.push(newProduct)
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2))
    res.status(201).json(newProduct)
})

app.put('/products/:id', (req, res) => {
  const products = getData('products');
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return res.status(404).send("Producto no encontrado");

  products[index] = { ...products[index], ...req.body };
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
  res.json(products[index]);
});

app.delete('/products/:id', (req, res) => {
  const products = getData('products');
  const id = Number(req.params.id);
  const updatedProducts = products.filter(p => p.id !== id);
  fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2));
  res.json({ mensaje: "Producto eliminado con éxito" });
});

/* USERS PATHS */

app.get('/users/:id', (req, res) => {
    const users = getData('users')
    const id = Number(req.params.id)
    const user = users.find(item => {item.id === id})
    user ? res.json(user) : res.status(404).send("No se encontro el usuario")
})

app.post('/users', (req, res) => {
    const users = getData('users')
    const newUser = {id : users.length + 1, ...req.body}
    users.push(newUser)
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
})

/* USER AUTH */

app.post('/users/login', (req, res) => {
    const {email, password} = req.body
    const users = getData('users')
    const user = users.find( us => us.email === email && us.password === password)

    if (user) {
        const userData = {
            id: user.id,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            ...(user.role === "admin" && { role: user.role })
        };
        res.json(userData);
    } else {
        res.status(401).json({mensaje : "Usuario no encontrado"})
    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})