import { InputNumber, Radio, Select, Space, Switch, type RadioChangeEvent, type SelectProps } from "antd";
import { useEffect, useState } from "react";
import { usePreferences } from "../../../hooks/usePreferences";

const options: SelectProps['options'] = [];

interface OptionsProps {
    optionType: 'switch' | 'select' | 'radio' | 'inputNumber';
    data: {
        field: string,
        title: string;
        subtitle: string;
        fullText?: string;
        options?: Array<{ value: number | boolean | string; label: string; }>;        
        multiple?: boolean;
    },
    onChangeValue?: (value: any) => void;
    defaultValue?: any;
}

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const Options = ({ optionType, data, onChangeValue, defaultValue }: OptionsProps) => {
    const { preferences } = usePreferences();
    const [value, setValue] = useState(defaultValue);

    const handleChange = () => {};

    const onChangeRadio = (value: number, field: any) => {
        setValue(value);
        const payload: any = {
            value,
            field
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

    const setStyle = () => {
        return {
            fontSize: `${preferences.fontSize}px`,
            lineHeight: `${preferences.lineHeight}px`,
        }
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
                        defaultChecked={defaultValue}
                        onChange={(checked) => {
                            handleOnChange(checked, data.field, option)
                        }} />
                    </div>
                    ))}   
                </div>
        );
            case 'select': return (
                <>
                    <p style={{lineHeight: `${preferences.lineHeight}px`}}>{data.subtitle}</p>
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
                <p>{value != 1 && data.subtitle}</p>
                <p>{value === 3 && data.fullText}</p>
                <Radio.Group value={value} onChange={(e: RadioChangeEvent) => onChangeRadio(e.target.value, data.field)}>
                    {data.options?.map((option) => (
                        <Radio value={option.value} style={setStyle()}>{option.label}</Radio>
                    ))}
                </Radio.Group>
                </>
            );
            case 'inputNumber': return (
                <>
                <p style={{lineHeight: `${preferences.lineHeight}px`}}>{data.subtitle}</p>
                <Space wrap>
                    <InputNumber 
                    size="large" 
                    min={14} 
                    max={40} 
                    defaultValue={defaultValue}
                    onChange={(value) => {
                        handleInputNumberChange(data?.field, value)
                    }} />
                </Space>
                </>
            )
        }
    };

    useEffect(() => {
        console.log(preferences)
    }, [preferences])

    return (
        <div style={setStyle()}>
            {handleOptionType()}
        </div>
    );
}

export default Options;