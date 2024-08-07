import { saveAs } from "file-saver";

export const convertJsonToFlowData = (jsonData: any) => {
  let nodes = "";
  let edges = "";

  jsonData.nodes?.forEach((node: any) => {
    nodes += `${node.id}("${node.label}")\n`;
  });

  jsonData.edges?.forEach((edge: any) => {
    const { from_id, type, to_id, label } = edge;
    edges += `${from_id} ${type === "solid" ? "-->" : "-.->"}${
      label ? `|${label}|` : ""
    } ${to_id}\n`;
  });

  return `graph ${jsonData.type}\n ${nodes} ${edges}`;
};

export const exportSvg = async (idChart: string, type: "download" | "view") => {
  const chart = document.getElementById(idChart);
  const chartSvg = chart?.querySelector("svg");
  const svg = chartSvg?.outerHTML;
  if (svg) {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    if (type === "download") {
      saveAs(blob, "exported_image.svg");
    }
    if (type === "view") {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }
  }
};

export const generateRandomId = (): string => {
  return (
    "id-" +
    Array.from({ length: 16 }, () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    ).join("")
  );
};

export const getLabelNode = (config: any, formValue: any) => {
  let label = "";
  const getDiv = (primary: boolean, value: any) =>
    `<div ${
      primary && 'style="font-weight: bold; font-family: system-ui;"'
    }>${value}</div>`;

  config.forEach((item: any) => {
    if (item.display_on_node) {
      switch (item.input_type) {
        case "text": {
          if (formValue[item.name]) {
            label += getDiv(item.primary, formValue[item.name]);
          }
          break;
        }
        case "select": {
          const value = item.options.find(
            (option: any) => option.value === formValue[item.name]
          )?.label;
          if (value) {
            label += getDiv(item.primary, value);
          }
          break;
        }
        default:
          break;
      }
    }
  });
  return label;
};

export const getLabelEdge = (config: any, formValue: any) => {
  let label = "";
  config.forEach((item: any) => {
    if (item.display_on_edge) {
      switch (item.input_type) {
        case "text": {
          if (formValue[item.name]) {
            label += `${formValue[item.name]} <br />`;
          }
          break;
        }
        case "select": {
          const value = item.options.find(
            (option: any) => option.value === formValue[item.name]
          )?.label;
          if (value) {
            label += `${value}<br />`;
          }
          break;
        }
        default:
          break;
      }
    }
  });
  return label;
};
