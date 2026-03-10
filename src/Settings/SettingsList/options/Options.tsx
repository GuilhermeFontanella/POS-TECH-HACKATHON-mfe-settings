import { InputNumber, Radio, Select, Space, Switch, type RadioChangeEvent, type SelectProps } from "antd";
import { useState } from "react";

const options: SelectProps['options'] = [];

interface OptionsProps {
    optionType: 'switch' | 'select' | 'radio' | 'inputNumber';
    data: {
        field: string,
        title: string;
        subtitle: string;
        options?: Array<{ value: number | boolean | string; label: string; }>;        
        multiple?: boolean;
    },
    onChangeValue?: (value: any) => void;
}

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const Options = ({ optionType, data, onChangeValue }: OptionsProps) => {
    const [value, setValue] = useState(1);

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const onChangeRadio = (value: number, data: any) => {
        setValue(value);
        const payload: any = {
            value,
            field: data
        }
        onChangeValue?.(payload)
    };

    const handleOnChange = (checked: boolean, field: any, option?: any) => {
        let payload: any;
        if (!field) {
            payload = {
                value: checked,
                field: option?.field
            }
        } else {
            payload = {
                value: checked,
                field: field
            }
        }
        onChangeValue?.(payload);
    }

    const handleInputNumberChange = (field: string, value: number | null) => {
        if (value !== null) onChangeValue?.({
            field: field,
            value
        });
    }

    const handleOptionType = () => {
        switch (optionType) {
            case 'switch': return (
                <div >
                    <p>{data.subtitle}</p>
                    {data.options?.map((option) => (
                    <div style={{margin: '4px'}}>
                        <span style={{paddingRight: '16px'}}>{option.label}</span>
                        <Switch 
                        defaultChecked 
                        onChange={(checked) => {
                            handleOnChange(checked, data.field, option)
                        }} />
                    </div>
                    ))}   
                </div>
        );
            case 'select': return (
                <>
                    <p>{data.subtitle}</p>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        defaultValue={['a10', 'c12']}
                        onChange={handleChange}
                        options={data.options}
                    />
                </>
            );
            case 'radio': return (
                <>
                <p>{data.subtitle}</p>
                <Radio.Group value={value} onChange={(e: RadioChangeEvent) => onChangeRadio(e.target.value, data)}>
                    {data.options?.map((option) => (
                        <Radio value={option.value}>{option.label}</Radio>
                    ))}
                </Radio.Group>
                </>
            );
            case 'inputNumber': return (
                <>
                <p>{data.subtitle}</p>
                <Space wrap>
                    <InputNumber 
                    size="large" 
                    min={14} 
                    max={20} 
                    defaultValue={1} 
                    onChange={(value) => {
                        handleInputNumberChange(data?.field, value)
                    }} />
                </Space>
                </>
            )
        }
    };

    return (
        <div>
            {handleOptionType()}
        </div>
    );
}

export default Options;