"use client";
import { useState } from "react";

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  // Validation email
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validation mot de passe critère par critère tu pourras changer 
  const passwordCriteria = (password) => ({
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  });

  // Vérifie si le mot de passe est entièrement valide
  const isPasswordValid = (password) =>
    Object.values(passwordCriteria(password)).every((ok) => ok);

  // Validation dynamique d’un champ
  const validateField = (name, value) => {
    if (name === "email") return !isValidEmail(value);
    if (name === "password") return !isPasswordValid(value);
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Mise à jour dynamique des erreurs
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:4000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, rememberMe }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Erreur lors de l'inscription ❌");
        } else {
          // Sauvegarde du token ou redirection
          if (rememberMe) {
            localStorage.setItem("token", data.token);
          } else {
            sessionStorage.setItem("token", data.token);
          }
          alert("Inscription réussie ✅");
          window.location.href = "/";
        }
      } catch (error) {
        console.error(error);
        alert("Impossible de contacter le serveur");
      }
    }
  };

  const criteria = passwordCriteria(formData.password);
  const passwordComplete = isPasswordValid(formData.password);
  const emailComplete = isValidEmail(formData.email);

  return (
    <div className="register-container">
      <h2>
        <i className="fas fa-user-plus"></i> Inscription
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            Email invalide
          </p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Checklist dynamique seulement si le mot de passe n'est pas complet moi flemmes de les ajouter au css*/}
        {!passwordComplete && formData.password && (
          <ul
            style={{
              fontSize: "12px",
              marginTop: "5px",
              paddingLeft: "20px",
            }}
          >
            <li style={{ color: criteria.minLength ? "green" : "red" }}>
              8 caractères minimum
            </li>
            <li style={{ color: criteria.hasUpperCase ? "green" : "red" }}>
              Au moins une majuscule
            </li>
            <li style={{ color: criteria.hasLowerCase ? "green" : "red" }}>
              Au moins une minuscule
            </li>
            <li style={{ color: criteria.hasNumber ? "green" : "red" }}>
              Au moins un chiffre
            </li>
            <li style={{ color: criteria.hasSpecialChar ? "green" : "red" }}>
              Au moins un caractère spécial
            </li>
          </ul>
        )}

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

        {/* Le bouton est désactivé si email ou mot de passe incomplets */}
        <button type="submit" disabled={!emailComplete || !passwordComplete}
          style={{
            marginTop: "10px",
          }}
        >
          S'inscrire
        </button>
      </form>

      <p className="register-link">
        Déjà inscrit ?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSwitchToLogin();
          }}
        >
          Connectez-vous
        </a>
      </p>
    </div>
  );
};

export default Register;
