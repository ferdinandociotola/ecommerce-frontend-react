import { useState } from 'react'

function AddProduct({ token }) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [categoryId, setCategoryId] = useState('1')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    fetch('https://ferdinandociotola.duckdns.org/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        slug,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category_id: parseInt(categoryId)
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Risposta:', data)
        if (data.success) {
          setMessage('✅ Prodotto aggiunto!')
          setName('')
          setSlug('')
          setDescription('')
          setPrice('')
          setStock('')
        } else {
          setMessage('❌ Errore: ' + (data.message || 'Errore sconosciuto'))
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Errore:', err)
        setMessage('❌ Errore di connessione')
        setLoading(false)
      })
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', border: '1px solid #ddd', marginTop: '20px' }}>
      <h3>Aggiungi Prodotto (Admin)</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Nome prodotto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Slug (es: iphone-16)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="Descrizione"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '8px', minHeight: '60px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            step="0.01"
            placeholder="Prezzo (es: 99.99)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            placeholder="Stock (es: 10)"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="1">Elettronica</option>
          </select>
        </div>

        {message && (
          <p style={{ 
            color: message.includes('✅') ? 'green' : 'red',
            marginBottom: '10px' 
          }}>
            {message}
          </p>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            background: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {loading ? 'Aggiungendo...' : '➕ Aggiungi Prodotto'}
        </button>
      </form>
    </div>
  )
}

export default AddProduct