import { BaseNode } from './BaseNode';
export const TransformNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="Transform" inputHandles={['in']} outputHandles={['out']}>
    Applies a transformation.
  </BaseNode>
);

export const ConditionalNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="Conditional" inputHandles={['condition', 'input']} outputHandles={['yes', 'no']}>
    Routes based on condition.
  </BaseNode>
);

export const DelayNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="Delay" inputHandles={['in']} outputHandles={['out']}>
    Adds delay.
  </BaseNode>
);

export const DatabaseNode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="Database" outputHandles={['query']} inputHandles={['trigger']}>
    Queries DB.
  </BaseNode>
);

export const APINode = ({ id, data }) => (
  <BaseNode id={id} data={data} label="API Call" inputHandles={['request']} outputHandles={['response']}>
    Calls external API.
  </BaseNode>
);