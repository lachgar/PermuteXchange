import React, { useContext, useState, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Card, Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import ProfesseursContext from './ProfesseursContext';

function findCycles1(graph) {
    const closedCycles = [];

    function dfs(node, path) {
        if (path.includes(node)) {
            const cycle = path.slice(path.indexOf(node));
            const firstNode = cycle[0];
            const lastNode = cycle[cycle.length - 1];

            // Vérifie si le cycle est fermé
            const isConnected = graph.links.some(
                (link) => link.source === lastNode && link.target === firstNode
            );

            if (isConnected) {
                const cycleNodes = cycle.map((nodeId) =>
                    graph.nodes.find((node) => node.id === nodeId)
                );
                const cycleString = cycleNodes
                    .map((node) => `${node.prenom} (${node.villeFaculteActuelle})`)
                    .join(" -> ");

                if (
                    !closedCycles.some(
                        (existingCycle) => existingCycle.join() === cycleNodes.join()
                    )
                ) {
                    closedCycles.push(cycleNodes);
                    console.log("Cycle fermé:", cycleString);
                }
            }

            return;
        }

        path.push(node);
        graph.links.forEach((link) => {
            if (link.source === node) {
                dfs(link.target, [...path]);
            }
        });
    }

    graph.nodes.forEach((node) => {
        let visitedNodes = [];
        let startNode = node.id;

        while (!visitedNodes.includes(startNode)) {
            visitedNodes.push(startNode);
            dfs(startNode, []);
            const lastLink = graph.links.find(
                (link) => link.source === startNode && !visitedNodes.includes(link.target)
            );
            if (lastLink) {
                startNode = lastLink.target;
            } else {
                break;
            }
        }
    });

    return closedCycles;
}

function findCycles2(graph) {
    const closedCycles = new Set();
    const visitedNodes = new Array(graph.nodes.length).fill(false);
  
    function dfs(node, path, visited) {
      visited[node] = true;
      path.push(node);
  
      graph.links.forEach((link) => {
        if (link.source === node) {
          const nextNode = link.target;
  
          if (path.includes(nextNode)) {
            const cycle = path.slice(path.indexOf(nextNode));
            closedCycles.add(JSON.stringify(cycle));
          } else if (!visited[nextNode]) {
            dfs(nextNode, path, visited);
          }
        }
      });
  
      path.pop();
      visited[node] = false;
    }
  
    graph.nodes.forEach((node) => {
      if (!visitedNodes[node.id]) {
        dfs(node.id, [], visitedNodes);
      }
    });
  
    const uniqueCycles = Array.from(closedCycles).map((cycleString) => {
      return JSON.parse(cycleString).map((nodeId) => {
        return graph.nodes.find((node) => node.id === nodeId);
      });
    });
  
    return uniqueCycles;
}

function findCycles(graph) {
    const closedCycles = new Set();
    const visitedNodes = new Array(graph.nodes.length).fill(false);
    let complexity = 0; // Variable pour stocker la complexité
  
    function dfs(node, path, visited) {
      visited[node] = true;
      path.push(node);
  
      graph.links.forEach((link) => {
        if (link.source === node) {
          const nextNode = link.target;
          complexity++; // Incrémenter la complexité lors de chaque comparaison d'arête
  
          if (path.includes(nextNode)) {
            const cycle = path.slice(path.indexOf(nextNode));
            closedCycles.add(JSON.stringify(cycle));
          } else if (!visited[nextNode]) {
            dfs(nextNode, path, visited);
          }
        }
      });
  
      path.pop();
      visited[node] = false;
    }
  
    graph.nodes.forEach((node) => {
      if (!visitedNodes[node.id]) {
        dfs(node.id, [], visitedNodes);
      }
    });
  
    const uniqueCycles = Array.from(closedCycles).map((cycleString) => {
      return JSON.parse(cycleString).map((nodeId) => {
        return graph.nodes.find((node) => node.id === nodeId);
      });
    });
  
    return { uniqueCycles, complexity };
  }


function findTwoNodeCycles(graph) {
    const cycles = [];

    graph.links.forEach((link) => {
        const source = link.source;
        const target = link.target;

        graph.links.forEach((innerLink) => {
            const innerSource = innerLink.source;
            const innerTarget = innerLink.target;

            // Vérifie que les liens sont différents
            if (link !== innerLink) {
                // Vérifie si les liens forment un cycle de deux nœuds
                if (source === innerTarget && target === innerSource) {
                    const cycleNodes = [
                        graph.nodes.find((node) => node.id === source),
                        graph.nodes.find((node) => node.id === target)
                    ];

                    // Vérifie que le cycle ne contient pas de doublons
                    if (!cycles.some((existingCycle) => {
                        const [firstNode, secondNode] = existingCycle;
                        return (
                            (firstNode.id === cycleNodes[0].id && secondNode.id === cycleNodes[1].id) ||
                            (firstNode.id === cycleNodes[1].id && secondNode.id === cycleNodes[0].id)
                        );
                    }) && cycleNodes[0].id !== cycleNodes[1].id) { // Vérifie que les deux nœuds sont différents
                        cycles.push(cycleNodes);
                    }
                }
            }
        });
    });

    return cycles;
}

function deduplicateCycles(cycles) {
    return cycles.filter((cycle, i) => {
        const cycleIds = cycle.map(node => node.id).sort();
        for (let j = 0; j < i; j++) {
            const otherCycleIds = cycles[j].map(node => node.id).sort();
            if (cycleIds.join() === otherCycleIds.join()) {
                return false;
            }
        }
        return true;
    });
}

function generateNodesAndLinks(data, specialite) {
    const nodes = [];
    const links = [];

    const data1 = data.filter((obj) => obj.specialite === specialite); // Filtrer les objets par spécialité

    // Parcourir les objets pour générer les nodes
    data1.forEach((obj) => {
        nodes.push({
            id: obj._id,
            email: obj.email,
            nom: obj.nom,
            prenom: obj.prenom,
            tel: obj.tel,
            grade: obj.grade,
            specialite: obj.specialite,
            faculteActuelle: obj.faculteActuelle,
            villeFaculteActuelle: obj.villeFaculteActuelle,
            villeDesiree: obj.villeDesiree,
        });
    });

    // Parcourir les objets pour générer les liens
    data1.forEach((obj1, index1) => {
        // Séparer les villes désirées en un tableau
        const villeDesiree1 = obj1.villeDesiree.split(";");
        data1.forEach((obj2) => {
            // Séparer les villes désirées en un tableau
            const villeDesiree2 = obj2.villeDesiree.split(";");
            if (villeDesiree1.includes(obj2.villeFaculteActuelle) && (obj1._id !== obj2._id)) {
                links.push({
                    source: obj1._id,
                    target: obj2._id,
                });
            } else if (villeDesiree2.includes(obj1.villeFaculteActuelle) && (obj1._id !== obj2._id)) {
                links.push({
                    source: obj2._id,
                    target: obj1._id,
                });
            }
        });
    });

    return { nodes, links };
}


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


const GraphContainer = () => {
    const dataP = useContext(ProfesseursContext);
    const [specialite, setSpecialite] = useState("Chimie"); // Ajouter l'état spécialité sélectionnée
    const graphRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const filteredData = dataP.filter((obj) => (obj.grade === 'PA' || obj.grade === 'PH' || obj.grade === 'PES')); // Filtrer les objets par spécialité

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const data2 = generateNodesAndLinks(filteredData, specialite); // Passer la spécialité sélectionnée à la fonction generateNodesAndLinks

    // Build links in both directions if necessary
    const links = data2.links.reduce((acc, link) => {
        const { source, target } = link;
        const existingLink = acc.find((l) => l.source === target && l.target === source);
        if (existingLink) {
            existingLink.bidirectional = true;
        } else {
            acc.push({ source, target, bidirectional: false });
        }
        return acc;
    }, []);

    const handleSpecialiteChange = (event) => {
        setSpecialite(event.target.value);
    };
     const {complexity, uniqueCycles} = findCycles(data2);

     const startTime = performance.now();
    const closedCycles = deduplicateCycles([...uniqueCycles, ...findTwoNodeCycles(data2)]);
    const endTime = performance.now();
    const executionTime = endTime - startTime;

    console.log(JSON.stringify(closedCycles));

    return (

        <Container>
            <h1>Combinaisons : </h1>
            <div className="p-grid p-justify-center p-fluid dashboard">
                <div>
                    <Card>
                        <Card.Body>
                            <Form.Group controlId="speciality" style={{ marginBottom: "10px" }}>
                                <Form.Control
                                    as="select"
                                    value={specialite}
                                    onChange={handleSpecialiteChange}>
                                    <option value="">Toutes les spécialités</option>
                                    {specialities.map((specialite) => (
                                        <option key={specialite} value={specialite}>{specialite}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <ForceGraph2D
                                ref={graphRef}
                                graphData={{ nodes: data2.nodes, links }}
                                nodeLabel={(node) => `${node.prenom} ${node.villeFaculteActuelle}`}
                                linkDirectionalArrowLength={10}
                                linkDirectionalArrowRelPos={1}
                                linkCurvature={0.1}
                                nodeAutoColorBy="nom"
                                linkColor={(link) => (link.bidirectional ? 'green' : 'gray')}
                                linkDirectionalArrowReverse={true}
                                width={width - width * 0.194}
                                height={height - height * 0.58}
                                nodeRelSize={6}
                                nodeResolution={10}
                                nodeOpacity={1}
                                linkOpacity={0.5}
                                linkResolution={10}
                                glScale={300}
                                linkDirectionalParticles={2}
                            />
                        </Card.Body>
                    </Card>
                </div>
                <div style={{ paddingTop: '8px', }}>
                    <Card>
                        <Card.Body>
                            <Form.Group controlId="speciality">
                                <Form.Label>Possible Combinations <br/> Graph Complexity = {complexity} <br/> Execution Time = {executionTime} ms</Form.Label>
                            </Form.Group>
                            {closedCycles.length === 0 ? (
                                <p>Aucun cycle fermé trouvé.</p>
                            ) : (
                                <ul>
                                    {closedCycles.map((cycle, index) => (
                                        <li key={index}>
                                            {cycle.map((node) => `${node.prenom} (${node.villeFaculteActuelle}) (${node.grade})`).join(' -> ')}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Card.Body>

                    </Card>
                </div>
            </div>
        </Container>
    );

};

export default GraphContainer;
