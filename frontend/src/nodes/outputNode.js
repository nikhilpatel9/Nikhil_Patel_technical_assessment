import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode id={id} data={data} label="Output Node" inputHandles={['in']}>
      Final output of the pipeline.
    </BaseNode>
  );
};
