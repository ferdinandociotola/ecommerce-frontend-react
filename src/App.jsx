import { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard'
import Login from './components/Login'


function App() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showLogin, setShowLogin]=useState(true)

  // Fetch API quando componente si carica
  useEffect(() => {
    fetch('https://ferdinandociotola.duckdns.org/api/products')
      .then(response => response.json())
      .then(data => {
        console.log(data)  // Debug: vedi struttura risposta
        setProducts(data.data)  // data.data perché API ritorna {success, data: [...]}
        setLoading(false)
      })
      .catch(error => {
        console.error('Errore:', error)
        setLoading(false)
      })
  }, [])  // [] = esegui solo una volta


return (
    <div style={{ padding: '20px' }}>
      {/*Pulsante toggle */}
      <button onClick={()=> setShowLogin(!showLogin)}
      style={{ marginBottom: '20px', padding:'10px'}}>
        {showLogin ? '📦 Mostra Prodotti' : '🔐 Login Admin'}
      </button>
 
      {/* Mostra Login O Prodotti */}
      {showLogin ? (
        <Login />
        ) : (
        <div>
          {loading ? (
            <div>Caricamento prodotti...</div>
          ) : (
            <>
              <p>Prodotti: {products.length}</p>
              {products.map(product => (
                <ProductCard 
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default App