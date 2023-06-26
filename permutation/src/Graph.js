import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

function Graph() {
  const graphRef = useRef(null);

  function findCycles() {
    const cycles = [];
    const visited = new Set();
  
    const dfs = (currentNode, stack) => {
      visited.add(currentNode.id);
  
      for (const link of currentNode.links) {
        const targetNode = link.target;
  
        if (visited.has(targetNode.id) && targetNode.id !== stack[0].id) {
          // Cycle detected
          const cycle = [...stack, targetNode];
          cycles.push(cycle);
          continue;
        }
  
        if (!visited.has(targetNode.id)) {
          dfs(targetNode, [targetNode, ...stack]);
        }
      }
  
      visited.delete(currentNode.id);
    };
  
    for (const node of graphRef.current.graphData.nodes) {
      dfs(node, [node]);
    }
  
    return cycles;
  }
  

  const data2 = {
    nodes: [
      { id: 'node1', nom: 'A', villeFaculteActuelle: 'Paris' },
      { id: 'node2', nom: 'B', villeFaculteActuelle: 'Lyon' },
      { id: 'node3', nom: 'C', villeFaculteActuelle: 'Marseille' },
      { id: 'node4', nom: 'D', villeFaculteActuelle: 'Lille' },
    ],
    links: [
      { source: 'node1', target: 'node2' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node1' },
      { source: 'node1', target: 'node4' },
    ],
  };

  return (
    <>
    <button onClick={findCycles}>Find cycles</button>
    <ForceGraph2D
      ref={graphRef}
      graphData={{ nodes: data2.nodes, links: data2.links }}
      nodeLabel={(node) => `${node.nom} ${node.villeFaculteActuelle}`}
      linkDirectionalArrowLength={10}
      linkDirectionalArrowRelPos={1}
      linkCurvature={0.1}
      nodeAutoColorBy="nom"
      linkColor={(link) => (link.bidirectional ? 'red' : 'gray')}
      linkDirectionalArrowReverse={true}
      width={1070}
      height={500}
      nodeRelSize={6}
      nodeResolution={10}
      nodeOpacity={1}
      linkOpacity={0.5}
      linkResolution={10}
      glScale={300}
      linkDirectionalParticles={2}
    />
    </>
  );
}

export default Graph;
