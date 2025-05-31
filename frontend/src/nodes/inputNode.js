import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} label="Input Node" outputHandles={['out']}>
      This is the input to your pipeline.
    </BaseNode>
  );
};
