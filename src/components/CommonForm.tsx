import { Button, Checkbox, Col, Divider, Flex, Form, Row, Switch } from 'antd';
import '../style.scss';
import useDynamicForm from '../hooks/useDynamicForm';

type Props = {
  common_form_config: any;
  common_form_submit_text: string;
  onSubmitCommonForm?: (value: any) => void;
};

const CommonForm = ({
  common_form_config,
  common_form_submit_text,
  onSubmitCommonForm,
}: Props) => {
  const [commonForm] = Form.useForm();
  const { getInput, getValuePropName } = useDynamicForm();

  const onFinish = (value: any) => {
    if (onSubmitCommonForm && typeof onSubmitCommonForm === 'function') {
      onSubmitCommonForm(value);
    }
  };

  return (
    <Form form={commonForm} layout="vertical" onFinish={onFinish}>
      <Row gutter={[24, 0]}>
        {common_form_config.map((input: any) => (
          <Col key={input.name} span={input.col_span || 12}>
            <Form.Item
              label={input.label}
              name={input.name}
              rules={input.rules}
              valuePropName={getValuePropName(input.input_type)}
              initialValue={input.initialValue}
            >
              {getInput(input)}
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Flex justify="flex-end">
        <Button
          type="primary"
          onClick={() => {
            commonForm.submit();
          }}
        >
          {common_form_submit_text}
        </Button>
      </Flex>
    </Form>
  );
};

export default CommonForm;
