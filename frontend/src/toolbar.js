import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  const nodeCategories = [
    {
      title: "Core Nodes",
      nodes: [
        { type: 'customInput', label: 'Input', color: 'from-green-500 to-emerald-600' },
        { type: 'customOutput', label: 'Output', color: 'from-red-500 to-rose-600' },
        { type: 'text', label: 'Text', color: 'from-yellow-500 to-amber-600' },
        { type: 'llm', label: 'LLM', color: 'from-purple-500 to-violet-600' },
      ]
    },
    {
      title: "New Nodes",
      nodes: [
        { type: 'transform', label: 'Transform', color: 'from-teal-500 to-cyan-600' },
        { type: 'conditional', label: 'Conditional', color: 'from-orange-500 to-red-600' },
        { type: 'delay', label: 'Delay', color: 'from-gray-500 to-slate-600' },
        { type: 'database', label: 'Database', color: 'from-indigo-500 to-blue-600' },
        { type: 'api', label: 'API Call', color: 'from-pink-500 to-rose-600' }
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-100 to-gray-100 border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Pipeline Builder</h2>

        {nodeCategories.map((category, i) => (
          <div key={i} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.nodes.map((node) => (
                <DraggableNode key={node.type} {...node} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
