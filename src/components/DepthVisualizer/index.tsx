import React, { FunctionComponent } from 'react';
import { OrderType } from "../OrderBook";
import { MOBILE_WIDTH } from "../../constants";

interface DepthVisualizerProps {
  depth: number;
  orderType: OrderType;
  windowWidth: number;
  maxTotal?: number;
}

const DepthVisualizerColors = {
  BIDS: "#113534",
  ASKS: "#3d1e28"
};

const DepthVisualizer: FunctionComponent<DepthVisualizerProps> = ({windowWidth, depth, orderType }) => {
  const width = (depth / 15) * 100;
  return <div data-testid="depth-visualizer" style={{
    backgroundColor: `${orderType === OrderType.BIDS ? DepthVisualizerColors.BIDS : DepthVisualizerColors.ASKS}`,
    height: "1.250em",
    width: `${width > 100 ? 100 : width}%`,
    position: "absolute",
    top: 0,
    right: 0,
    transition: "width 0.3s ease",
    left: `${orderType === OrderType.BIDS && windowWidth > MOBILE_WIDTH ? `${100 - width < 0 ? 0 : 100 - width}%` : 0}`,
    zIndex: 1,
  }} />;
};

export default React.memo(DepthVisualizer);