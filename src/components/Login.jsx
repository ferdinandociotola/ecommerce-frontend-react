import { useState } from 'react'
import AddProduct from './AddProduct'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  //Leggo LocalStorage
  const [token, setToken] = useState(()=> {
    return localStorage.getItem('auth_token') //recupero il token
  })


  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    fetch('https://ferdinandociotola.duckdns.org/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Risposta:', data)
        if (data.success) {
          setToken(data.token)
          localStorage.setItem('auth_token', data.token) // Salvo il token in storage
          alert('Login effettuato!')
        } else {
          setError('Credenziali non valide')
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Errore:', err)
        setError('Errore di connessione')
        setLoading(false)
      })
  }

  //Funzione Logout
  const handleLogout=()=> {
    setToken(null)
    localStorage.removeItem('auth_token') //rimuovo token da storage
    alert('Logout Effettuato')
    }


  if (token) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>✅ Benvenuto Admin!</h2>
        <p>Token: {token.substring(0, 20)}...</p>
        <button onClick={() => setToken(null)}>Logout</button>

         {/* ← AddProduct */}
        <AddProduct token={token} />
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Login Admin</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            background: loading ? '#ccc' : '#007ACC',
            color: 'white',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Caricamento...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Test: admin@test.com / password
      </p>
    </div>
  )
}

export default Login