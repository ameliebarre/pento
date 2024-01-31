"use client";

import React from "react";
import { IconType } from "react-icons";

interface SVGIconProps {
  icon: IconType;
  color?: string;
  size?: string | number;
}

const SVGIcon: React.FC<SVGIconProps> = ({ icon: Icon, color, size = 24 }) => {
  return <Icon color={color} size={size} />;
};

export default SVGIcon;
