import { useMemo } from "react";
import { Collapse } from "antd";
import NodeForm from "./NodeForm";
import { useAppContext } from "../hooks/useAppContext";

const NodeList = () => {
  const { sourceState } = useAppContext();

  const nodeItems = useMemo(() => {
    return sourceState.nodes.map((node: any) => ({
      key: node.node_id,
      label: node.node_name,
      children: (
        <>
          <NodeForm mode="DETAIL" onAfterSubmit={() => {}} nodeDetail={node} />
        </>
      ),
    }));
  }, [sourceState]);
  return (
    nodeItems &&
    nodeItems.length > 0 && <Collapse accordion items={nodeItems} />
  );
};

export default NodeList;
