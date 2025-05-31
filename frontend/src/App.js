import React from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
};

export default App;
