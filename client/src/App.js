import './App.css'
import { useSelector } from 'react-redux'
import { Auth } from './views/Auth'
import { Home } from './views/Home'
import { Profile } from './views/Profile'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
    const user = useSelector((state) => state.authReducer.authData)
    console.log(user)

    return (
        <div className="App">
            <div className="blur" style={{ top: '-18%', right: '0' }}></div>
            <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
            <Routes>
                <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="auth" />} />
                <Route path="/home" element={user ? <Home /> : <Navigate to="../auth" />} />
                <Route path="/auth" element={user ? <Navigate to="../home" /> : <Auth />} />
                <Route path="/profile/:userId" element={user ? <Profile /> : <Navigate to="../auth" />} />
            </Routes>
        </div>
    )
}

export default App
