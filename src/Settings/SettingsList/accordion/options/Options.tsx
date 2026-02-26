import { Select, Switch, type SelectProps } from "antd";

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const Options = () => {
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    return (
        <div>
            <h2>Options</h2>
            <Switch defaultChecked onChange={onChange} />
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={['a10', 'c12']}
                onChange={handleChange}
                options={options}
            />
        </div>
    );
}

export default Options;