import React, { useState, useEffect } from 'react';

const Login = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Connexion:', formData);
    
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
      
      <div onSubmit={handleSubmit}>
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
      </div>
      
      <label style={{fontSize: '14px', marginTop: '10px', display: 'block'}}>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          style={{marginRight: '5px'}}
        />
        Se souvenir de moi
      </label>
      
      <p style={{marginTop: '10px', fontSize: '14px'}}>
        <a href="#" style={{color: 'burlywood', textDecoration: 'none', fontWeight: 'bold'}}>
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