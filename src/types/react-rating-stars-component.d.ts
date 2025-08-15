declare module "react-rating-stars-component"{
import * as React from "react";
  type Props = {
    count?: number;
    onChange?: (newValue: number) => void;
    size?: number;
    value?: number;
    activeColor?: string;
    color?: string;
    isHalf?: boolean;
    a11y?: boolean;
    // add more props if you want TS help
    [key: string]: any;
  };
  const ReactStars: React.FC<Props>;
  export default ReactStars;
}