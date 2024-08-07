import { Button, Modal, Space } from "antd";
import { useState } from "react";
import EdgeForm from "./EdgeForm";
import EdgeList from "./EdgeList";

const EdgeManager = () => {
  const [isEdgeCreateModalOpen, setIsEdgeCreateModalOpen] = useState(false);

  const tonggleCreateEdgeModal = () =>
    setIsEdgeCreateModalOpen((prev) => !prev);

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Button onClick={tonggleCreateEdgeModal}>Thêm hành động</Button>
      <Modal
        title="Thêm hành động"
        open={isEdgeCreateModalOpen}
        okText={"Thêm"}
        cancelText={"Huỷ"}
        onCancel={tonggleCreateEdgeModal}
        footer={null}
      >
        <EdgeForm
          mode="CREATE"
          onAfterSubmit={tonggleCreateEdgeModal}
          tonggleCreateEdgeModal={tonggleCreateEdgeModal}
        />
      </Modal>
      <EdgeList />
    </Space>
  );
};

export default EdgeManager;
