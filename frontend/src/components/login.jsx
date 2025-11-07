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
        body: JSON.stringify({ ...formData, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur de connexion");
      } else {
        if (rememberMe) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }
        alert("Connexion réussie ✅");
        window.location.href = "/";
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
            fontSize: "14px",
            gap: "6px",
            whiteSpace: "nowrap",
          }}
        >
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{
              margin: 0,
              padding: 0,
              width: "14px",
              height: "14px",
              accentColor: "#7C3AED",
            }}
          />
          <label htmlFor="rememberMe"
            style={{
              cursor: "pointer",
              userSelect: "none",
              margin: 0,
              color: "#333",
            }}>
            Se souvenir de moi
          </label>
        </div>

        <button type="submit" onClick={handleSubmit}
          style={{
            marginTop: "10px",
          }}
        >
          Se connecter
        </button>
      </form>

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