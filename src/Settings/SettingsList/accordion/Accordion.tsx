import { Collapse, type CollapseProps } from "antd";
import Options from "./options/Options";

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <Options />,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <Options />,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <Options />,
  },
];

const Accordion = () => {
    return (
    <Collapse style={{background: 'blue', width: '100%'}} accordion items={items} />
);
}

export default Accordion;