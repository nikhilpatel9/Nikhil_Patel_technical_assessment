export const DraggableNode = ({ type, label, color = 'from-blue-500 to-purple-600' }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.target.style.cursor = 'grabbing';
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = 'grab';
  };

  return (
    <div
      className="cursor-grab transition transform hover:scale-105 hover:shadow-lg"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
    >
      <div className={`bg-gradient-to-r ${color} text-white px-4 py-2 rounded-lg min-w-[100px] text-center`}>
        {label}
      </div>
    </div>
  );
};
