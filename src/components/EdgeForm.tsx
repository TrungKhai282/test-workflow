import { useEffect, useMemo } from 'react';
import { Button, Col, Flex, Form, Row, Select } from 'antd';
import '../style.scss';
import { generateRandomId } from '../utils';
import { useAppContext } from '../hooks/useAppContext';
import useDynamicForm from '../hooks/useDynamicForm';
import PencilSquare from './icons/PencilSquare';

type Props = {
  mode: 'CREATE' | 'DETAIL';
  onAfterSubmit?: any;
  edgeDetail?: any;
  tonggleCreateEdgeModal?: any;
};

const EdgeForm = ({
  mode,
  onAfterSubmit,
  edgeDetail,
  tonggleCreateEdgeModal,
}: Props) => {
  const { sourceState, setSourceState, sourceConfig } = useAppContext();
  const [edgeForm] = Form.useForm();
  const { getInput } = useDynamicForm();

  const listNodeOptions = useMemo(() => {
    return sourceState.nodes.map((node: any) => ({
      label: node.node_name,
      value: node.node_id,
    }));
  }, [sourceState]);

  const saveEdge = (edgeFormValues: any) => {
    if (mode === 'CREATE') {
      const edge = {
        edge_id: generateRandomId(),
        ...edgeFormValues,
      };
      setSourceState((prev: any) => ({
        ...prev,
        edges: [...prev.edges, edge],
      }));

      edgeForm.resetFields();
      onAfterSubmit();
    }

    if (mode === 'DETAIL') {
      setSourceState((prev: any) => ({
        ...prev,
        edges: prev.edges.map((edge: any) =>
          edge.edge_id === edgeDetail.edge_id
            ? { ...edge, ...edgeFormValues }
            : edge,
        ),
      }));
    }
  };

  const deleteEdge = () => {
    setSourceState((prev: any) => ({
      ...prev,
      edges: prev.edges.filter(
        (edge: any) => edge.edge_id !== edgeDetail.edge_id,
      ),
    }));
  };

  useEffect(() => {
    if (mode === 'DETAIL' && edgeDetail) {
      edgeForm.setFieldsValue(edgeDetail);
    }
  }, [edgeDetail]);

  return (
    <Form form={edgeForm} layout="vertical" onFinish={saveEdge}>
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <Form.Item label={'Từ node'} name={'edge_from_id'} required={true}>
            <Select placeholder="Chọn node">
              {listNodeOptions.map((option: any) => (
                <Select.Option
                  key={`edge-from-id-${option.value}`}
                  value={option.value}
                >
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={'Đến node'} name={'edge_to_id'} required={true}>
            <Select placeholder="Chọn node">
              {listNodeOptions.map((option: any) => (
                <Select.Option
                  key={`edge-to-id-${option.value}`}
                  value={option.value}
                >
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={'Kiểu line'} name={'edge_type'} required={true}>
            <Select placeholder="Chọn kiểu line">
              <Select.Option value="solid">Nét liền</Select.Option>
              <Select.Option value="dot">Nét đứt</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        {sourceConfig?.edge_form.map((input: any) => (
          <Col key={input.name} span={input.col_span || 12}>
            <Form.Item
              label={
                <Flex gap={6}>
                  {input.label} {input.display_on_edge && <PencilSquare />}
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
          <Button danger onClick={tonggleCreateEdgeModal}>
            Huỷ
          </Button>
        )}
        {mode === 'DETAIL' && (
          <Button danger type="primary" onClick={deleteEdge}>
            Xoá
          </Button>
        )}
        <Button type="primary" onClick={() => edgeForm.submit()}>
          Lưu
        </Button>
      </Flex>
    </Form>
  );
};

export default EdgeForm;
