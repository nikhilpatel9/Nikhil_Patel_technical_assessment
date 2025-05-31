// Enhanced store.js with improved state management

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    
    removeNode: (nodeId) => {
        set({
            nodes: get().nodes.filter(node => node.id !== nodeId),
            edges: get().edges.filter(edge => 
                edge.source !== nodeId && edge.target !== nodeId
            )
        });
    },
    
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    
    onConnect: (connection) => {
        const newEdge = {
            ...connection,
            type: 'smoothstep',
            animated: true,
            style: { strokeWidth: 2 },
            markerEnd: {
                type: MarkerType.Arrow,
                height: '20px',
                width: '20px',
                color: '#6366f1'
            }
        };
        
        set({
            edges: addEdge(newEdge, get().edges),
        });
    },
    
    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        data: { ...node.data, [fieldName]: fieldValue }
                    };
                }
                return node;
            }),
        });
    },
    
    clearPipeline: () => {
        set({
            nodes: [],
            edges: [],
            nodeIDs: {}
        });
    },
    
    // Helper methods for pipeline analysis
    getNodeCount: () => get().nodes.length,
    getEdgeCount: () => get().edges.length,
    
    getPipelineData: () => ({
        nodes: get().nodes,
        edges: get().edges
    })
}));