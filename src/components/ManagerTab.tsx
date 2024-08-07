import { Tabs } from "antd";
import EdgeManager from "./EdgeManager";
import NodeManager from "./NodeManager";

const ManagerTab = () => {
  return (
    <Tabs
      defaultActiveKey="quanlynode"
      items={[
        {
          label: "Quản lý node",
          key: "quanlynode",
          children: <NodeManager />,
        },
        {
          label: "Quản lý hành động",
          key: "quanlyhanhdong",
          children: <EdgeManager />,
        },
      ]}
    />
  );
};

export default ManagerTab;
