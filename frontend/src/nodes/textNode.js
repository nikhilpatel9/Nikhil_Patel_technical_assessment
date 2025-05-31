import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data.text || '');
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const matches = [...text.matchAll(/{{\s*([\w\d_]+)\s*}}/g)];
    setVariables([...new Set(matches.map(match => match[1]))]);
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
    if (data.onFieldChange) {
      data.onFieldChange('text', e.target.value);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border shadow-md w-auto min-w-[180px] max-w-[300px]">
      <div className="text-sm font-medium text-gray-700 mb-2">Text Node</div>

      {variables.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={v}
          style={{ top: 30 + i * 20 }}
          className="w-3 h-3 bg-blue-500 border-2 border-white"
        />
      ))}

      <textarea
        value={text}
        onChange={handleChange}
        className="w-full border rounded-md p-2 text-sm text-gray-700 resize"
        rows={Math.max(3, text.split('\n').length)}
        placeholder="Enter text here..."
      />

      <Handle
        type="source"
        position={Position.Right}
        id="text"
        className="w-3 h-3 bg-green-500 border-2 border-white"
      />
    </div>
  );
};
