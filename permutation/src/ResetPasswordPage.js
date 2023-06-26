import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { isExpired, decodeToken } from "react-jwt";
import _ from 'lodash';

const ResetPasswordPage = () => {
    //const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [valideToken, setValideToken] = useState(false);
    const [email, setEmail] = useState();
    const [token, setToken] = useState('');

    useEffect(() => {
        // Effectuez ici des vérifications supplémentaires du token si nécessaire
        if (localStorage.getItem('resetToken') !== null) {
            const storedToken = localStorage.getItem('resetToken');
            const decodedStoredToken = decodeToken(storedToken);
            const urlParams = new URLSearchParams(window.location.search);
            setToken(urlParams.get('token'));
            setEmail(decodedStoredToken && decodedStoredToken.userId.email);
            const decodedToken = decodeToken(token);

            const truncatedToken = decodeToken(token.substring(0, 100));
            const truncatedStoredToken = decodeToken(storedToken.substring(0, 100));
            if (_.isEqual(truncatedToken, truncatedStoredToken)) {
                setValideToken(true);
            }
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Vérifiez si les mots de passe correspondent
        if (password !== confirmPassword) {
            setMessage('Les mots de passe ne correspondent pas.');
            return;
        } else if (valideToken) {
            console.log(email);
            // Effectuez ici votre logique de réinitialisation du mot de passe avec le token et le nouveau mot de passe
            try {
                const response = await fetch('https://tiny-worm-nightgown.cyclic.app/password/init', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });


                if (response.ok) {
                    // Le mot de passe a été initialisé avec succès

                    localStorage.removeItem('resetToken');
                    setMessage('Le mot de passe a été réinitialisé avec succès.');
                } else {
                    // Une erreur s'est produite lors de l'initialisation du mot de passe
                    setMessage('Erreur lors de l\'initialisation du mot de passe');
                }
            } catch (error) {
                console.error(error);
            }
            // Réinitialisez les champs de formulaire
            setPassword('');
            setConfirmPassword('');
        }else  {
            setMessage('Veuillez solliciter un nouveau lien en utilisant la fonctionnalité "changer le mot de passe" car le lien précédent a expiré.');
             // Réinitialisez les champs de formulaire
             setPassword('');
             setConfirmPassword('');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <Card style={{ marginTop: '20px' }}>
                <Card.Body>
                    <Card.Title>Réinitialiser le mot de passe</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="password">
                            <Form.Label>Nouveau mot de passe</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirmer le nouveau mot de passe</Form.Label>
                            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>
                        <Button style={{ marginTop: '20px' }} variant="primary" type="submit">Réinitialiser le mot de passe</Button>
                        {message && <p>{message}</p>}
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ResetPasswordPage;
