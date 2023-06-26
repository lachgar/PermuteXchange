import React, { useContext, useState } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import ProfesseursContext from './ProfesseursContext';
import ProgressBarWithLabel from './ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const FilterData = () => {
    const [speciality, setSpeciality] = useState('');
    const [currentFacCity, setCurrentFacCity] = useState('');
    const [desiredCity, setDesiredCity] = useState('');
    const dataP = useContext(ProfesseursContext);

    // Tableau contenant les villes marocaines
    const cities = ['Agadir', 'Es-Semara', 'Al Hoceima', 'El Kelaa des Sraghna', 'Assilah', 'Azemmour', 'Azrou', 'Beni Mellal', 'Benslimane', 'Berkane', 'Berrechid', 'Boujdour', 'Boulemane', 'Casablanca', 'Chefchaouen', 'Dakhla', 'El Hajeb', 'El Jadida', 'Errachidia', 'Essaouira', 'Fès', 'Figuig', 'Guelmim', 'Ifrane', 'Kénitra', 'Khemisset', 'Khenifra', 'Khouribga', 'Laâyoune', 'Larache', 'Marrakech', 'Meknès', 'Mohammédia', 'Nador', 'Ouarzazate', 'Ouazzane', 'Oujda', 'Rabat', 'Safi', 'Salé', 'Sefrou', 'Settat', 'Sidi Kacem', 'Tan-Tan', 'Sidi Bennour', 'Tanger', 'Taourirt', 'Taroudant', 'Taza', 'Témara', 'Tétouan', 'Tiznit'].sort();


    // Tableau contenant les spécialités
    const specialities = [
        'Physique',
        'Amazighe',
        'Espagnol',
        'Informatique',
        'Médecine',
        'Linguistique arabe',
        'Droit',
        'Chimie',
        'Mathématiques',
        'Génie Civil',
        'Génie Électrique',
        'Génie Mécanique',
        'Génie Chimique',
        'Sciences Économiques',
        'Sciences Politiques',
        'Langues et Littératures',
        'Chimie minérale',
        'Chimie Physique',
        'Histoire',
        'Didactique des SVT',
        'Science de Gestion',
        'Logistique',
        'Électronique, Instrumentation et Énergétique',
        'Géographie',
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
        'Arts visuels',
        'Études religieuses',
        'Études de genre',
        'Science de la nutrition',
        'Éducation',
        'Anglais',
        'Physiologie végétale',
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
        'Biologie et biotechnologie agroalimentaire',
        'Biotechnologie agroalimentaire',
        'Finance',
        'Géomatique et Hydrologie',
        'Génie industriel et maintenance',
        'Télécommunication',
        'Droit publique',
        'Géologie',
        'Biochimie',
        'Droit français',
        'Statistiques et probabilités',
        'Physique médicale',
        'Patrimoine',
        'Physiologie animale',
        'Géophysique',
        'Électronique, électrotechnique et automatique',
        'Génie de procédés',
        'Droit privé',
    ].sort();


    const filteredData = dataP && dataP.filter((item) => {
        return (
            item['specialite'].toLowerCase().includes(speciality.toLowerCase()) &&
            item['villeFaculteActuelle']
                .toLowerCase()
                .includes(currentFacCity.toLowerCase()) &&
            item['villeDesiree'].toLowerCase().includes(desiredCity.toLowerCase())
        );
    });

    return Object.keys(dataP).length > 0 ? (
        <Container>
            <h1>Rechercher</h1>
            <Card>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col xs={12} md={3}>
                                <Form.Group controlId="speciality">
                                    <Form.Label>Spécialité:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={speciality}
                                        onChange={(e) => setSpeciality(e.target.value)}
                                    >
                                        <option value="">Toutes les spécialités</option>
                                        {specialities.map((speciality) => (
                                            <option value={speciality} key={speciality}>
                                                {speciality}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={3}>
                                <Form.Group controlId="currentFacCity">
                                    <Form.Label>Ville Actuelle:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={currentFacCity}
                                        onChange={(e) => setCurrentFacCity(e.target.value)}
                                    >
                                        <option value="">Toutes les villes</option>
                                        {cities.map((city) => (
                                            <option value={city} key={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={3}>
                                <Form.Group controlId="desiredCity">
                                    <Form.Label>Ville Désirée:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={desiredCity}
                                        onChange={(e) => setDesiredCity(e.target.value)}
                                    >
                                        <option value="">Toutes les villes</option>
                                        {cities.map((city) => (
                                            <option value={city} key={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={3}>
                                <Button variant="primary" type="submit" onClick={() => { setSpeciality(''); setCurrentFacCity(''); setDesiredCity(''); }}>
                                    <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                                    Réinitialiser
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <Card style={{ marginTop: "10px" }}>
                <Card.Body>
                    <Card.Title>Résultats de la recherche</Card.Title>
                    <ul>
                        {filteredData.map((item) => (
                            <li key={item.email}>
                                {item.nom} {item.prenom} ({item.email} | {item.tel} | {item.grade}) - {item['specialite']} -{' '}
                                ({item['faculteActuelle']} | {item['villeFaculteActuelle']}) ---&gt; {item['villeDesiree']}
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>

        </Container>

    ) : (<ProgressBarWithLabel />);
};

export default FilterData;