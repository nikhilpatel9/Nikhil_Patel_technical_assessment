import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, label, className = '', inputHandles = [], outputHandles = [], children }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md border p-4 w-64 ${className}`}>
      <div className="font-semibold text-sm mb-2 text-center text-gray-800">{label}</div>

      {inputHandles.map((name, index) => (
        <Handle
          key={name}
          type="target"
          position={Position.Left}
          id={name}
          style={{ top: 40 + index * 20 }}
          className="w-3 h-3 bg-blue-500 border-2 border-white"
        />
      ))}

      <div className="text-sm text-gray-600">{children}</div>

      {outputHandles.map((name, index) => (
        <Handle
          key={name}
          type="source"
          position={Position.Right}
          id={name}
          style={{ top: 40 + index * 20 }}
          className="w-3 h-3 bg-green-500 border-2 border-white"
        />
      ))}
    </div>
  );
};
