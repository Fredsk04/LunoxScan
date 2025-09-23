import React, { useState, useEffect } from 'react';

const Login = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur de connexion");
      } else {
        // Sauvegarder le token si rememberMe est coché
        if (rememberMe) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }
        alert("Connexion réussie ✅");
      }
    } catch (err) {
      setError("Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <h2>
        <i className="fas fa-sign-in-alt"></i> Connexion
      </h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="identifier"
          placeholder="Email ou nom d'utilisateur"
          value={formData.identifier}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type="submit" onClick={handleSubmit}>
          Se connecter
        </button>
      </form>
      
      <label style={{fontSize: '14px', marginTop: '10px', display: 'block'}}>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          style={{marginRight: '5px'}}
        />Se souvenir de moi
      </label>
      
      <p style={{marginTop: '10px', fontSize: '14px'}}>
        <a href="#" style={{color: '#6b21a8', textDecoration: 'none', fontWeight: 'bold'}}>
          Mot de passe oublié ?
        </a>
      </p>
      
      <p className="register-link">
        Pas encore de compte ?{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>
          Créer un compte
        </a>
      </p>
    </div>
  );
};
export default Login