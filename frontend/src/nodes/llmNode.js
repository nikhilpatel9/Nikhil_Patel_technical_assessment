import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} label="LLM Node" inputHandles={['input']} outputHandles={['output']}>
      Calls a language model.
    </BaseNode>
  );
};
