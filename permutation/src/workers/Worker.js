onmessage = function(event) {
    // Récupérer les données envoyées depuis le composant React
    const { nodes, links } = event.data;
    console.log("hi");
    // Effectuer le calcul dans le worker
    const closedCycles = deduplicateCycles([...findCycles({ nodes, links }), ...findTwoNodeCycles({ nodes, links })]);

    // Envoyer les résultats au composant React
    postMessage(closedCycles);
  }


function findCycles(graph) {
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
                    .map((node) => `${node.nom} (${node.villeFaculteActuelle})`)
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

  