import React, { useState } from "react";
import { Navbar, Nav, Button, Modal, Form } from "react-bootstrap";
import { AuthContext } from './AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { isExpired, decodeToken } from "react-jwt";

const Header = () => {
  const { loggedIn, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  if (token && token != 'undefined') {
    login(token);
  }
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleLoginModalClose = () => setShowLoginModal(false);
  const handleLoginModalShow = () => setShowLoginModal(true);
  const handleLogOut = () => {
    navigate('/');
    logout();
  }

  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Construire l'objet avec les données d'authentification
    const authData = {
      email: email,
      password: password
    };

    // Envoyer la requête POST vers le serveur pour l'authentification
    fetch('https://tiny-worm-nightgown.cyclic.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your_token_here'
      },
      body: JSON.stringify(authData)
    })
      .then(response => response.json())
      .then(data => {
        // Traiter la réponse du serveur
        if (data.token !== undefined) {
          localStorage.setItem('token', data.token);
          login(data.token);
          handleLoginModalClose();
          const truncatedToken = decodeToken(data.token);
          navigate('/');
        } else {
          localStorage.removeItem('token');
          setMsg("Adresse e-mail ou mot de passe incorrect.");
        }
        // Ajouter la logique pour gérer la réponse d'authentification ici
      })
      .catch(error => {
        console.error(error);
        // Gérer les erreurs de requête ici
      });

  };

  // Replace with your authentication logic

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">ProfSwap - أساتذة التعليم العالي</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Accueil</Nav.Link>
          {loggedIn ? (
            <>
              <Nav.Link href="/register"> {loggedIn? 'Profil':'Inscription'}</Nav.Link>
              <Nav.Link href="/filter">Rechercher</Nav.Link>
              <Nav.Link href="/combine">Combinaisons</Nav.Link>
              <Nav.Link href="/about">A propos</Nav.Link>
              <Button variant="link" onClick={handleLogOut}>
                <FaSignOutAlt /> Sign Out
              </Button>
            </>
          ) : (
            <>
              <Nav.Link href="/register">Inscription</Nav.Link>
              <Nav.Link href="/about">A propos</Nav.Link>
              <Button variant="link" onClick={handleLoginModalShow}>
              <FaSignInAlt /> Connexion
              </Button>
            </>
          )}
          
        </Nav>
      </Navbar.Collapse>
      <Modal show={showLoginModal} onHide={handleLoginModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Authentification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Adresse Email : </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Mot de passe : </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <div style={{ textAlign: "center", paddingTop: '20px' }}>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button variant="link" href="/forgot-password">
                Mot de passe oublié ?
              </Button>
              <br />
              <span style={{ color: 'red' }}>{msg}</span>
            </div>

          </Form>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default Header;

