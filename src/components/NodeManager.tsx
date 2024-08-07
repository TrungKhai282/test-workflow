import { Button, Modal, Space } from "antd";
import { useState } from "react";
import NodeForm from "./NodeForm";
import NodeList from "./NodeList";

const NodeManager = () => {
  const [isCreateNodeModalOpen, setIsCreateNodeModalOpen] = useState(false);
  const tonggleCreateNodeModal = () =>
    setIsCreateNodeModalOpen((prev) => !prev);

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Button onClick={tonggleCreateNodeModal}>Thêm node</Button>
      <Modal
        title="Thêm node"
        open={isCreateNodeModalOpen}
        okText={"Thêm"}
        cancelText={"Huỷ"}
        onCancel={tonggleCreateNodeModal}
        footer={null}
      >
        <NodeForm
          mode="CREATE"
          onAfterSubmit={tonggleCreateNodeModal}
          tonggleCreateNodeModal={tonggleCreateNodeModal}
        />
      </Modal>
      <NodeList />
    </Space>
  );
};

export default NodeManager;
