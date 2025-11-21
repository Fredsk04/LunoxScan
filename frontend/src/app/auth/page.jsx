/*
C'est la route servent à l'authentification 
Au lieu de créer deux routes pour la connexion et l'inscription on va créer une seule route auth
cette route va faire appels aux deux composants Login du fichier login.jsx dans Components
et au composent Register de register.jsx dans components aussi
Ainsi on peut switcher facilement sans changer de page
*/


"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";   
import Register from '../../components/register';
import Login from '../../components/login';
import "./auth.css"

// Voici le composant principal
const Authentification = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [flashMessage, setFlashMessage] = useState('');
  const router = useRouter();

  const switchToLogin = () => {
    setIsLogin(true);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const goBack = () => {
    router.back(); // revient à la page précédente
  };

  return (
    <>

      <div className="auth-body">
        <div className="auth-overlay"></div>
        
        {/* Boutons de basculement */}
        <div className="toggle-buttons">
          <button 
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={switchToLogin}
          >
            <i className="fas fa-sign-in-alt"></i> Connexion
          </button>
          <button 
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={switchToRegister}
          >
            <i className="fas fa-user-plus"></i> Inscription
          </button>
        </div>
        
        {/* Contenu dynamique */}
        {isLogin ? (
          <Login onSwitchToRegister={switchToRegister} />
        ) : (
          <Register onSwitchToLogin={switchToLogin} />
        )}
        
        {/* Bouton retour */}
        <button href="/" className="back-btn" onClick={goBack}>
          <i className="fas fa-arrow-left"></i> Retour
        </button>
      </div>
    </>
  );
};

export default Authentification;