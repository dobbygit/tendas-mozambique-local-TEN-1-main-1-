import React from "react";
import { YellowGreenButton } from "@/components/YellowGreenButton";

export default {
  title: "Components/YellowGreenButton",
  component: YellowGreenButton,
};

export const Default = () => (
  <div className="p-4 bg-white">
    <YellowGreenButton>Yellow Button with Green Text</YellowGreenButton>
  </div>
);

export const Small = () => (
  <div className="p-4 bg-white">
    <YellowGreenButton size="sm">Small Button</YellowGreenButton>
  </div>
);

export const Large = () => (
  <div className="p-4 bg-white">
    <YellowGreenButton size="lg">Large Button</YellowGreenButton>
  </div>
);

export const Disabled = () => (
  <div className="p-4 bg-white">
    <YellowGreenButton disabled>Disabled Button</YellowGreenButton>
  </div>
);

export const WithCategories = () => (
  <div className="p-4 bg-white">
    <YellowGreenButton>Filter Categories</YellowGreenButton>
  </div>
);

export const WithProductCard = () => (
  <div className="p-4 bg-white">
    <YellowGreenButton>View Product</YellowGreenButton>
  </div>
);
