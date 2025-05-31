import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      const result = await response.json();

      alert(`📊 Nodes: ${result.num_nodes}\n🔗 Edges: ${result.num_edges}\n${
        result.is_dag ? '✅ DAG is valid!' : '❌ Not a DAG (cycle exists)'
      }`);
    } catch (err) {
      alert('Error contacting backend: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <button
        onClick={handleSubmit}
        disabled={isLoading || nodes.length === 0}
        className={`px-6 py-2 rounded-lg text-white font-medium ${
          isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105'
        }`}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Pipeline'}
      </button>
    </div>
  );
};
