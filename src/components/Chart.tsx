import { useEffect, useMemo, useRef } from 'react';
import mermaid from 'mermaid';
import { convertJsonToFlowData } from '../utils';
import '../style.scss';
import clsx from 'clsx';
import { Empty } from 'antd';

mermaid.initialize({});

export type SourceProps = {
  type: string;
  nodes: {
    id: string;
    label: string;
  }[];
  edges: {
    from_id: string;
    to_id: string;
    type: string;
    label: string;
  }[];
};

type ChartProps = {
  id: string;
  source: SourceProps;
  onClickNode?: (nodeId: string) => void;
};

const Chart = ({ id, source, onClickNode }: ChartProps) => {
  const mermaidRef: any = useRef(null);

  const data = useMemo(() => {
    if (source && source.nodes.length > 0) {
      return convertJsonToFlowData(source);
    }

    return '';
  }, [source]);

  useEffect(() => {
    const loadMermaid = async () => {
      try {
        if (mermaidRef.current) {
          mermaidRef.current.removeAttribute('data-processed');

          await mermaid.run();
          await mermaid.contentLoaded();

          mermaidRef.current.querySelectorAll('.node').forEach((node: any) => {
            node.addEventListener('click', () => {
              const nodeId = node.getAttribute('data-id');
              mermaidRef.current
                .querySelectorAll('.node')
                .forEach((node: any) => node.classList.remove('active'));
              node.classList.add('active');
              if (onClickNode && typeof onClickNode === 'function') {
                onClickNode(nodeId);
              }
            });
          });
        }
      } catch (e) {
        console.error('Error loading Mermaid chart:', e);
      }
    };
    if (data) {
      loadMermaid();
    }
  }, [data, onClickNode]);

  return data ? (
    <div id={id} ref={mermaidRef} className="flowchart-module mermaid">
      {data}
    </div>
  ) : (
    <Empty />
  );
};

export default Chart;
