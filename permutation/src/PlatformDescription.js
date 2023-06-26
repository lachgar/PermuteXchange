import React from 'react';
import { Card } from 'react-bootstrap';

const PlatformDescription = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Plateforme de Permutation pour Enseignants Universitaires</Card.Title>
        <Card.Text className="text-justify">
          Cette plateforme est simplement un espace permettant aux professeurs universitaires de rechercher un partenaire pour une permutation. Elle se limite à cette fonctionnalité. Les enseignants peuvent rechercher des partenaires intéressés par un échange dans d'autres établissements d'enseignement supérieur. Le système facilite la recherche et la correspondance entre les enseignants ayant une volonté mutuelle d'échanger.
        </Card.Text>
        <Card.Text className="text-justify">
          La plateforme offre une interface conviviale et sécurisée aux enseignants pour communiquer et échanger les informations nécessaires. Les membres peuvent créer des profils personnels et renseigner des informations concernant leurs spécialités, les établissements et les informations de contact. Les enseignants peuvent consulter les profils des partenaires potentiels et entrer en contact avec eux pour discuter des détails de l'accord d'échange.
        </Card.Text>
        <Card.Text className="text-justify">
          En utilisant cette plateforme, les enseignants peuvent faciliter leur recherche de partenaires d'échange, économiser du temps et des efforts en évitant les communications individuelles et les recherches continues d'opportunités d'échange. Ce système est efficace et utile pour les enseignants souhaitant changer d'institution ou travailler dans un nouvel établissement pour élargir leur expérience académique.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PlatformDescription;
