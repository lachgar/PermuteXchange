import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import emailjs from 'emailjs-com';



const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Annule le rechargement de la page par défaut du formulaire
    try {
      const response = await axios.post('https://tiny-worm-nightgown.cyclic.app/forget', { email: email });
      const resetToken = response.data.token; // Récupérez le jeton de la réponse
      // Envoyez l'e-mail de réinitialisation via emailjs
      const templateParams = {
        to_email: email,
        reset_link: generateResetLink(resetToken)
      };
      localStorage.setItem('resetToken', resetToken);
      const result = await emailjs.send('service_f8s4nb6', 'template_trelfkj', templateParams, 'yRpf6V5qQ6Kel-mvt');
      if (result.text == 'OK')
        setMsg("Veuillez vérifier votre boîte mail."); // Affiche le résultat de l'envoi de l'e-mail
      } catch (error) {
      console.error(error);
    }
  };

  function generateResetLink(resetToken) {
    // Logique pour générer le lien de réinitialisation
    const resetLink = `https://permutation.vercel.app/reset-password?token=${resetToken}`;
    // Retourne le lien complet
    return resetLink;
  }

  return (
    <Modal show={true}>
      <Modal.Header closeButton>
        <Modal.Title>Mot de passe oublié</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Veuillez saisir votre adresse e-mail pour récupérer votre mot de passe :</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Adresse e-mail : </Form.Label>
            <Form.Control type="email" placeholder="Entrez votre adresse e-mail" value={email} onChange={handleEmailChange} required />
          </Form.Group>

          <div style={{ textAlign: "center", paddingTop: '20px' }}>
            <Button variant="primary" type="submit">
              Envoyer
            </Button>
            <br />
            <span style={{ color: 'green' }}>{msg}</span>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" href="/">Retour</Button>
      </Modal.Footer>

    </Modal>
  );
};

export default ForgotPassword;
