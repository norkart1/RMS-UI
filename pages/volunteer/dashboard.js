import React, { useState } from "react";
import Portal_Layout from "../../components/portal/portal_Layout";

function Dashboard() {
  const [activeTabName, setActiveTabName] = useState();
  const [activeChildTabName, setActiveChildTabName] = useState();

  return (
    <Portal_Layout
      activeTabName="dashboard"
      activeChildTabName=""
      userType="volunteer"
    >
      <div>
        <h1>Dashboard</h1>
      </div>
    </Portal_Layout>
  );
}

export default Dashboard;
