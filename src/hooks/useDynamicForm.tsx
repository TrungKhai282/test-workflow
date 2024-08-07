import {
  Input,
  Select,
  InputNumber,
  Radio,
  Space,
  Switch,
  Checkbox,
} from 'antd';

const useDynamicForm = () => {
  const getInput = (input: any) => {
    switch (input.input_type) {
      case 'text':
        return <Input placeholder={input.placeholder || ''} />;
      case 'select':
        return (
          <Select placeholder={input.placeholder || ''}>
            {input.options.map((option: any) => (
              <Select.Option
                key={`option-${input.name}-${option.value}`}
                value={option.value}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
      case 'number':
        return <InputNumber min={input.min} max={input.max} />;
      case 'radio':
        return (
          <Radio.Group>
            <Space direction={input.direction || 'horizontal'}>
              {input.options.map((option: any) => (
                <Radio
                  key={`option-${input.name}-${option.value}`}
                  value={option.value}
                >
                  {option.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        );
      case 'switch':
        return (
          <>
            <Switch defaultChecked={input.defaultChecked} />
            <span style={{ marginLeft: 6 }}>{input.input_label}</span>
          </>
        );
      case 'checkbox':
        return <Checkbox>{input.input_label}</Checkbox>;
      case 'checkbox_group':
        return <Checkbox.Group options={input.options} />;
      default:
        return <></>;
    }
  };

  const getValuePropName = (type: string) => {
    switch (type) {
      case 'switch':
      case 'checkbox':
        return 'checked';
      default:
        return 'value';
    }
  };

  return {
    getInput,
    getValuePropName,
  };
};

export default useDynamicForm;
