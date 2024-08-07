import { useEffect } from 'react';
import { Button, Col, Flex, Form, Row, Space } from 'antd';
import '../style.scss';
import { useAppContext } from '../hooks/useAppContext';
import { generateRandomId } from '../utils';
import useDynamicForm from '../hooks/useDynamicForm';
import DeleteIcon from './icons/DeleteIcon';
import DiskIcon from './icons/DiskIcon';
import PencilSquare from './icons/PencilSquare';

type Props = {
  mode: 'CREATE' | 'DETAIL';
  onAfterSubmit?: any;
  nodeDetail?: any;
  tonggleCreateNodeModal?: any;
};
const NodeForm = ({
  mode,
  onAfterSubmit,
  nodeDetail,
  tonggleCreateNodeModal,
}: Props) => {
  const { setSourceState, sourceConfig } = useAppContext();
  const [nodeForm] = Form.useForm();
  const { getInput } = useDynamicForm();

  const saveNode = (nodeFormValues: any) => {
    // const nodeFormValues = nodeForm.getFieldsValue();
    if (mode === 'CREATE') {
      const node = {
        node_id: generateRandomId(),
        ...nodeFormValues,
      };
      setSourceState((prev: any) => ({
        ...prev,
        nodes: [...prev.nodes, node],
      }));
      nodeForm.resetFields();
      onAfterSubmit();
    }

    if (mode === 'DETAIL') {
      setSourceState((prev: any) => ({
        ...prev,
        nodes: prev.nodes.map((node: any) =>
          node.node_id === nodeDetail.node_id
            ? { ...node, ...nodeFormValues }
            : node,
        ),
      }));
    }
  };

  const deleteNode = () => {
    setSourceState((prev: any) => ({
      ...prev,
      nodes: prev.nodes.filter(
        (node: any) => node.node_id !== nodeDetail.node_id,
      ),
    }));
  };

  useEffect(() => {
    if (mode === 'DETAIL' && nodeDetail) {
      nodeForm.setFieldsValue(nodeDetail);
    }
  }, [nodeDetail]);

  return (
    <Form form={nodeForm} layout="vertical" onFinish={saveNode}>
      <Row gutter={[24, 0]}>
        {sourceConfig?.node_form.map((input: any) => (
          <Col key={input.name} span={input.col_span || 12}>
            <Form.Item
              label={
                <Flex gap={6}>
                  {input.label} {input.display_on_node && <PencilSquare />}
                </Flex>
              }
              name={input.name}
              rules={input.rules}
            >
              {getInput(input)}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Flex justify="flex-end" gap={12}>
        {mode === 'CREATE' && (
          <Button danger onClick={tonggleCreateNodeModal}>
            Huỷ
          </Button>
        )}
        {mode === 'DETAIL' && (
          <Button
            danger
            type="primary"
            onClick={deleteNode}
            icon={<DeleteIcon />}
          >
            Xoá
          </Button>
        )}
        <Button
          type="primary"
          onClick={() => nodeForm.submit()}
          icon={<DiskIcon />}
        >
          Lưu
        </Button>
      </Flex>
    </Form>
  );
};

export default NodeForm;
