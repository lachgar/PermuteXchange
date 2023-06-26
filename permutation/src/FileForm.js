import React, { useState, useRef, useEffect, useContext } from 'react';
import { Form, Alert, Button, Container, Card } from 'react-bootstrap';
import Select from 'react-select';
import { Toast } from 'primereact/toast';
import { FaUser, FaMapMarkerAlt, FaPhone, FaBook, FaUniversity, FaEnvelope, FaGraduationCap, FaPassport } from 'react-icons/fa';
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from './AuthContext';



const FileForm = () => {
    const [_id, setId] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [grade, setGrade] = useState('');
    const [specialite, setSpecialite] = useState('');
    const [villeActuelle, setVilleActuelle] = useState('');
    const [etablissement, setEtablissement] = useState('');
    const [villeDesiree, setVilleDesiree] = useState('');
    const [password, setPassword] = useState('');
    const [user, SetUser] = useState(null);
    const [auth, setAuth] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { logout } = useContext(AuthContext);
    const [isValidEmail, setIsValidEmail] = useState(true);



    const resetForm = () => {
        setNom("");
        setPrenom("");
        setTel("");
        setEmail("");
        setGrade("");
        setEtablissement("");
        setSpecialite("");
        setVilleActuelle("");
        setVilleDesiree([]);
        setPassword('');
    }

    // Tableau contenant les villes marocaines
    const cities = ['Agadir', 'Es-Semara', 'Sidi Bennour', 'El Kelaa des Sraghna', 'Al Hoceima', 'Assilah', 'Azemmour', 'Azrou', 'Beni Mellal', 'Benslimane', 'Berkane', 'Berrechid', 'Boujdour', 'Boulemane', 'Casablanca', 'Chefchaouen', 'Dakhla', 'El Hajeb', 'El Jadida', 'Errachidia', 'Essaouira', 'Fès', 'Figuig', 'Guelmim', 'Ifrane', 'Kénitra', 'Khemisset', 'Khenifra', 'Khouribga', 'Laâyoune', 'Larache', 'Marrakech', 'Meknès', 'Mohammédia', 'Nador', 'Ouarzazate', 'Ouazzane', 'Oujda', 'Rabat', 'Safi', 'Salé', 'Sefrou', 'Settat', 'Sidi Kacem', 'Tan-Tan', 'Tanger', 'Taourirt', 'Taroudant', 'Taza', 'Témara', 'Tétouan', 'Tiznit'].sort();

    const citiesOptions = cities.map((city) => ({ value: city, label: city }));

    // Tableau contenant les spécialités
    const specialities = [
        'Physique',
        'Espagnol',
        'Amazighe',
        'Informatique',
        'Droit privé',
        'Médecine',
        'Anglais',
        'Droit',
        'Chimie',
        'Mathématiques',
        'Science de Gestion',
        'Génie Civil',
        'Génie Électrique',
        'Génie Mécanique',
        'Génie Chimique',
        'Didactique des SVT',
        'Sciences Économiques',
        'Sciences Politiques',
        'Langues et Littératures',
        'Histoire',
        'Géographie',
        'Linguistique arabe',
        'Physiologie végétale ',
        'Psychologie',
        'Sociologie',
        'Philosophie',
        'Anthropologie',
        'Archéologie',
        'Sciences de l\'environnement',
        'Ingénierie aérospatiale',
        'Gestion des affaires internationales',
        'Sciences de la communication',
        'Musique',
        'Théâtre',
        'Chimie minérale',
        'Chimie Physique',
        'Arts visuels',
        'Études religieuses',
        'Études de genre',
        'Science de la nutrition',
        'Éducation',
        'Relations publiques',
        'Traduction et interprétation',
        'Criminologie',
        'Études autochtones',
        'Études de développement',
        'Design graphique',
        'Design industriel',
        'Journalisme',
        'Bibliothéconomie et sciences de l\'information',
        'Travail social',
        'Biologie',
        'Électronique, Instrumentation et Énergétique',
        'Biologie et biotechnologie agroalimentaire',
        'biotechnologie agroalimentaire',
        'Finance',
        'Géomatique et Hydrologie',
        'Génie industriel et maintenance',
        'Droit publique',
        'Logistique',
        'Géologie',
        'Biochimie',
        'Droit français',
        'Statistiques et probabilités',
        'Physique médicale',
        'Patrimoine',
        'Télécommunication',
        'Physiologie animale',
        'Géophysique',
        'Électronique, électrotechnique et automatique',
        'Génie de procédés',
    ].sort();

    const loadUser = () => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            const decodedToken = decodeToken(token);
            SetUser(decodedToken);
            console.log(decodedToken);
            setAuth(true);
            setId(decodedToken?.userId?._id || '');
            setNom(decodedToken?.userId?.nom || '');
            setPrenom(decodedToken?.userId?.prenom || '');
            setTel(decodedToken?.userId?.tel || '');
            setEmail(decodedToken?.userId?.email || '');
            setGrade(decodedToken?.userId?.grade || '');
            setEtablissement(decodedToken?.userId?.faculteActuelle || '');
            setVilleActuelle(decodedToken?.userId?.villeFaculteActuelle || '');
            setSpecialite(decodedToken?.userId?.specialite || '');
            const villeDesireeArray = decodedToken?.userId?.villeDesiree ? decodedToken.userId.villeDesiree.split(';') : [];
            const citiesOptions1 = villeDesireeArray.map((city) => ({ value: city, label: city }));
            const villes = decodedToken?.userId?.villeDesiree ? decodedToken.userId.villeDesiree.split(';') : [];

            setVilleDesiree(villes.map((city) => ({ value: city, label: city })));
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    const handleEmailChange = (value) => {
        const enteredEmail = value;
        setEmail(enteredEmail);
        setIsValidEmail(enteredEmail.endsWith('.ma'));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // vous pouvez ensuite enregistrer les données dans un fichier JSON avec une requête AJAX ou un fetch vers un serveur
        const data1 =
        {
            email: email.toLowerCase(),
            nom: nom.toUpperCase(),
            prenom: prenom.substring(0, 1).toUpperCase() + "" + prenom.substring(1).toLowerCase(),
            tel: tel,
            grade: grade,
            specialite: specialite,
            faculteActuelle: etablissement.toUpperCase(),
            villeFaculteActuelle: villeActuelle,
            villeDesiree: villeDesiree.map(ville => ville.value).join(";")
        };

        if (auth) {
            data1._id = _id;
        } else {
            data1.password = password;
        }

        console.log(JSON.stringify(data1)); // pour tester dans la console
        fetch('https://tiny-worm-nightgown.cyclic.app/professeurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data1)
        })
            .then(response => {
                if (!response.ok) {
                    toast.current.show({ severity: 'danger', summary: 'Erreur', detail: 'Ce compte existe déjà', life: 3000 });
                    throw new Error('Network response was not ok');
                } else {
                    return response.json();
                }
            })
            .then(data => {
                if (!auth) resetForm();
                toast.current.show({ severity: 'success', summary: 'Bien enregistré', detail: 'Vous pouvez maintenant chercher une possibilité de permutation', life: 3000 });
                localStorage.setItem('token', data.token);
            })
            .catch(error => {
                toast.current.show({ severity: 'danger', summary: 'Erreur', detail: 'Ce compte existe déjà', life: 3000 });
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const formatVillesDesirees = (villesDesireesString) => {
        if (!villesDesireesString) {
            return [];
        }

        const villesDesireesArray = villesDesireesString.split(";");
        const villesDesireesOptions = villesDesireesArray.map((ville) => ({
            value: ville,
            label: ville,
        }));
        return villesDesireesOptions;
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = decodeToken(token);
            const response = await fetch(`https://plain-teal-bull.cyclic.app/professeurs/` + decodedToken?.userId?.email, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Le professeur a été supprimé avec succès
                localStorage.removeItem("token");
                navigate('/'); // Naviguez vers une autre page si nécessaire
                logout();
            } else {
                // Gérer les erreurs de suppression du professeur
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    const handleConfirmDelete = () => {
        setShowConfirmation(false);
        handleDelete();
    };

    const handleShowConfirmation = () => {
        setShowConfirmation(true);
    };

    return (
        <div>
            <Container>
                <Card style={{ marginTop: "20px" }}>
                    <Card.Body>
                        <Card.Title>
                            {!(auth) ? 'Inscription' : 'Profil'
                            }
                        </Card.Title>
                        {(auth) ? (
                            <>
                                <Button variant="danger" onClick={handleShowConfirmation} style={{ position: 'absolute', top: 10, right: 10 }}>
                                    Supprimer mon compte
                                </Button>

                                <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirmation de suppression</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Êtes-vous sûr de vouloir supprimer votre compte ?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseConfirmation}>
                                            Annuler
                                        </Button>
                                        <Button variant="danger" onClick={handleConfirmDelete}>
                                            Confirmer la suppression
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>) : ('')
                        }
                        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
                            <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                <Form.Group controlId="formId" style={{ flexBasis: '50%', marginRight: '10px', paddingTop: '10px' }}>
                                    <Form.Control required type="hidden" value={_id} onChange={(e) => setId(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formNom" style={{ flexBasis: '50%', marginRight: '10px', paddingTop: '10px' }}>
                                    <Form.Label> <FaUser /> Nom</Form.Label>
                                    <Form.Control required type="text" placeholder="Entrez votre nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formPrenom" style={{ flexBasis: '50%', marginRight: '10px', paddingTop: '10px' }}>
                                    <Form.Label><FaUser /> Prénom</Form.Label>
                                    <Form.Control required type="text" placeholder="Entrez votre prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formTel" style={{ flexBasis: '50%', marginRight: '10px', paddingTop: '10px' }}>
                                    <Form.Label><FaPhone /> Téléphone</Form.Label>
                                    <Form.Control required type="text" placeholder="Entrez votre numéro de téléphone" value={tel} onChange={(e) => setTel(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formEmail" style={{ flexBasis: '50%', marginRight: '10px', paddingTop: '10px' }}>
                                    <Form.Label><FaEnvelope /> Email</Form.Label>
                                    {auth ? (
                                        <Form.Control disabled required type="email" placeholder="Entrez votre adresse email" value={email} onChange={(e) => handleEmailChange(e.target.value)} />
                                    ) : (
                                        <Form.Control required type="email" placeholder="Entrez votre adresse email" value={email} onChange={(e) => handleEmailChange(e.target.value)} />

                                    )}
                                    {!isValidEmail && <Alert variant="danger">Veuillez utiliser une adresse e-mail académique valide pour continuer. Merci !</Alert>}

                                </Form.Group>
                                {!auth ? (
                                    <Form.Group controlId="formPassword" style={{ flexBasis: '50%', marginRight: '10px', paddingTop: '10px' }}>
                                        <Form.Label><FaPassport /> Mot de passe </Form.Label>
                                        <Form.Control required type="password" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                ) : ''}


                                <Form.Group controlId="formGrade" style={{ flexBasis: '50%', marginRight: '10px', paddingTop: '10px' }}>
                                    <Form.Label> <FaGraduationCap /> Grade</Form.Label>
                                    <Form.Control as="select" required value={grade} onChange={(e) => setGrade(e.target.value)}>
                                        <option value="">Choisissez votre grade</option>
                                        <option value="PES">PES</option>
                                        <option value="PH">PH</option>
                                        <option value="PA">PA</option>
                                        <option value="Ingénieur">Ingénieur</option>
                                        <option value="Administrateur">Administrateur</option>
                                        <option value="Technicien">Technicien</option>
                                        <option value="PESQ">PESQ</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formGrade" style={{ flexBasis: '50%', marginRight: '10px', paddingTop: '10px' }}>
                                    <Form.Label> <FaUniversity /> Etablissement (abréviation: FST, FS, EST, ENSA ...)</Form.Label>
                                    <Form.Control required type="text" placeholder="Entrez votre établissement" value={etablissement} onChange={(e) => setEtablissement(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formSpecialite" style={{ flexBasis: '50%', marginRight: '10px', paddingTop: '10px' }}>
                                    <Form.Label><FaBook /> Spécialité</Form.Label>
                                    <Form.Control required as="select" value={specialite} onChange={(e) => setSpecialite(e.target.value)}>
                                        <option value="">Choisissez une spécialité</option>
                                        {specialities.map((speciality) => (
                                            <option value={speciality} key={speciality}>
                                                {speciality}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formVilleActuelle" style={{ flexBasis: '50%', marginRight: '10px', paddingTop: '10px' }}>
                                    <Form.Label><FaMapMarkerAlt /> Ville Actuelle</Form.Label>
                                    <Form.Control required as="select" value={villeActuelle} onChange={(e) => setVilleActuelle(e.target.value)}>
                                        <option value="">Choisissez une ville</option>
                                        {cities.map((city) => (
                                            <option value={city} key={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formVilleDesiree" style={{ flexBasis: '50%', marginRight: '10px', paddingTop: '10px' }}>
                                    <Form.Group controlId="formVilleDesiree" style={{ marginRight: '10px', width: '100%' }}>
                                        <Form.Label><FaMapMarkerAlt /> Villes Désirées</Form.Label>
                                        <Select
                                            required
                                            isMulti={true}
                                            value={villeDesiree}
                                            onChange={setVilleDesiree}
                                            options={citiesOptions}
                                        />
                                    </Form.Group>
                                </Form.Group>

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                                {isValidEmail &&
                                    <Button variant="primary" type="submit" style={{ width: '50%' }}>
                                        {!(auth) ? 'Envoyer' : 'Modifier'}
                                    </Button>
                                }
                                </div>
                                <Toast ref={toast} position="bottom-right" />
                            </Form>
                        </div>
                    </Card.Body>
                </Card>

            </Container>

        </div>
    );
};

export default FileForm;
