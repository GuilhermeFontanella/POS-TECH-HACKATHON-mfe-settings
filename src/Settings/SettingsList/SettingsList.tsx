import { Avatar, List } from 'antd';
import Accordion from './accordion/Accordion';
import * as styles from './SettingsList.css';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const SettingsList = () => {
    return (
        <List
            className={styles.list}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
            <List.Item>
                <Accordion />
            </List.Item>
            )}
        />
    );
}

export default SettingsList;