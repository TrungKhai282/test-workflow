import { useEffect, useMemo } from 'react';
import './style.scss';
import Chart from './components/Chart';
import { Button, Divider, Flex, Layout, Space } from 'antd';
import { exportSvg, getLabelEdge, getLabelNode } from './utils';
import CommonForm from './components/CommonForm';
import ManagerTab from './components/ManagerTab';
import { useAppContext } from './hooks/useAppContext';
import DownloadIcon from './components/icons/DownloadIcon';
import EyeIcon from './components/icons/EyeIcon';

// const chartData = convertJsonToFlowData(data);
export type MainProps = {
  config: any;
  module_id: string;
  onWorkflowChange?: (value: any) => void;
  onSubmitCommonForm?: (value: any) => void;
};

function Main({
  config,
  module_id,
  onWorkflowChange,
  onSubmitCommonForm,
}: MainProps) {
  const { sourceState, sourceConfig, setSourceConfig } = useAppContext();

  const source = useMemo(() => {
    return {
      type: 'LR',
      nodes: sourceState.nodes.map(({ node_id, ...nodeValues }: any) => ({
        id: node_id,
        label: getLabelNode(config.node_form, nodeValues),
      })),
      edges: sourceState.edges.map(
        ({ edge_from_id, edge_to_id, edge_type, ...edgeValues }: any) => ({
          from_id: edge_from_id,
          to_id: edge_to_id,
          type: edge_type,
          label: getLabelEdge(config.edge_form, edgeValues),
        }),
      ),
    };
  }, [sourceState, config]);

  useEffect(() => {
    setSourceConfig(config);
  }, [config]);

  useEffect(() => {
    if (onWorkflowChange && typeof onWorkflowChange === 'function') {
      onWorkflowChange(sourceState);
    }
  }, [onWorkflowChange, sourceState]);

  return (
    <Layout className="workflow-layout">
      <Space direction="vertical" size="large">
        {sourceConfig?.common_form && (
          <CommonForm
            common_form_config={sourceConfig?.common_form}
            common_form_submit_text={sourceConfig.common_form_submit_text}
            onSubmitCommonForm={onSubmitCommonForm}
          />
        )}

        <Divider dashed />
        {source && <Chart id={module_id} source={source} />}
        <Divider dashed />
        <Flex gap={12}>
          {sourceConfig?.is_allow_download && (
            <Button
              type="primary"
              icon={<DownloadIcon />}
              onClick={() => exportSvg(module_id, 'download')}
              disabled={sourceState.nodes.length < 1}
            >
              {sourceConfig?.download_button_text || ' Tải xuống'}
            </Button>
          )}
          {sourceConfig?.is_allow_viewfull && (
            <Button
              type="default"
              icon={<EyeIcon />}
              onClick={() => exportSvg(module_id, 'view')}
              disabled={sourceState.nodes.length < 1}
            >
              {sourceConfig?.viewfull_button_text || 'Xem toàn màn hình'}
            </Button>
          )}
        </Flex>
        <ManagerTab />
      </Space>
    </Layout>
  );
}

export default Main;
