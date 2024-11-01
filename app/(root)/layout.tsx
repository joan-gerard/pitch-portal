import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>NON DASHBOARD NAV</h1>
      {children}
    </div>
  );
};

export default layout;
