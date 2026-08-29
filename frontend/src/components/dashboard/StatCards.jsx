import React from "react";

const StatCards = ({ stats = {} }) => {
  const safeStats =
    stats && typeof stats === "object"
      ? stats
      : {};

  const dailyGeneration = Number(
    safeStats.dailyGeneration ??
      safeStats.dailyGenerationKwh ??
      0
  );

  const gridConsumption = Number(
    safeStats.gridConsumption ??
      safeStats.gridConsumptionKwh ??
      0
  );

  const systemEfficiency = Number(
    safeStats.systemEfficiency ??
      safeStats.efficiency ??
      0
  );

  const activePanels = Number(
    safeStats.activePanels ?? 0
  );

  const openTickets = Number(
    safeStats.openTickets ?? 0
  );

  return (
    <div className="stat-cards">

      <div className="stat-card">
        <div className="stat-title">
          Daily Generation (KWh)
        </div>

        <div className="stat-value">
          {dailyGeneration.toFixed(2)}
        </div>
      </div>


      <div className="stat-card">
        <div className="stat-title">
          Grid Consumption (KWh)
        </div>

        <div className="stat-value">
          {gridConsumption.toFixed(2)}
        </div>
      </div>


      <div className="stat-card">
        <div className="stat-title">
          System Efficiency
        </div>

        <div className="stat-value">
          {systemEfficiency.toFixed(1)}%
        </div>
      </div>


      <div className="stat-card">
        <div className="stat-title">
          Active Panels
        </div>

        <div className="stat-value">
          {activePanels}
        </div>
      </div>


      <div className="stat-card">
        <div className="stat-title">
          Open Tickets
        </div>

        <div className="stat-value">
          {openTickets}
        </div>
      </div>

    </div>
  );
};

export default StatCards;