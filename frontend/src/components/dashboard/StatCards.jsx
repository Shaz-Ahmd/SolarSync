import React from 'react';

const StatCards = ({ stats }) => {
  if (!stats) {
    return null;
  }

  const cards = [
    {
      label: 'Daily Generation (KWh)',
      value: stats.totalGeneration.toFixed(2),
      color: '#2563eb'
    },
    {
      label: 'Grid Consumption (KWh)',
      value: stats.totalConsumption.toFixed(2),
      color: '#444444'
    },
    {
      label: 'System Efficiency',
      value: `${(stats.efficiencyRatio * 100).toFixed(1)}%`,
      color: '#10b981'
    },
    {
      label: 'Active Panels',
      value: stats.totalActivePanels,
      color: '#f59e0b'
    },
    {
      label: 'Open Tickets',
      value: stats.openTickets,
      color: '#8b5cf6'
    }
  ];

  return (
    <div className="stat-cards-row">
      {cards.map((card, index) => (
        <div
          key={index}
          className="stat-card"
          style={{ borderLeft: `4px solid ${card.color}` }}
        >
          <div>{card.label}</div>
          <strong style={{ color: card.color }}>
            {card.value}
          </strong>
        </div>
      ))}
    </div>
  );
};

export default StatCards;