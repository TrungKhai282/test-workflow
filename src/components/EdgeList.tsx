import { useMemo } from "react";
import { Collapse } from "antd";
import EdgeForm from "./EdgeForm";
import { useAppContext } from "../hooks/useAppContext";

const EdgeList = () => {
  const { sourceState } = useAppContext();

  const edgeItems = useMemo(() => {
    return sourceState.edges.map((edge: any) => ({
      key: edge.edge_id,
      label: edge.edge_name,
      children: (
        <>
          <EdgeForm mode="DETAIL" onAfterSubmit={() => {}} edgeDetail={edge} />
        </>
      ),
    }));
  }, [sourceState]);
  return (
    edgeItems &&
    edgeItems.length > 0 && <Collapse accordion items={edgeItems} />
  );
};

export default EdgeList;
