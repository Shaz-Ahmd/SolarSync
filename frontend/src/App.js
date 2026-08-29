export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const analytics = {
    dailyGeneration: 1250.5,
    gridConsumption: 840.25,
    systemEfficiency: 87.5,
    activePanels: 24,
    openTickets: 3,

    ticketData: [
      {
        label: "Open",
        value: 3,
        color: "#ef4444",
      },
      {
        label: "In Progress",
        value: 2,
        color: "#f59e0b",
      },
      {
        label: "Resolved",
        value: 8,
        color: "#22c55e",
      },
    ],
  };

  const recent = [
    {
      id: 1,
      message: "Solar Site Alpha generated 1250 kWh today",
      date: "Today",
    },
    {
      id: 2,
      message: "Maintenance ticket created",
      date: "Today",
    },
    {
      id: 3,
      message: "Solar Panel inspection completed",
      date: "Yesterday",
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="container">

      <div className="welcome-card">
        <h1>
          Welcome back, {user.username}!
        </h1>

        <p>
          Your role:{" "}
          <strong>
            {user.role?.replace(/_/g, " ")}
          </strong>
        </p>
      </div>

      {user.role === "SYSTEM_ADMINISTRATOR" && (
        <>
          <StatCards stats={analytics} />

          <StatusDonut
            data={analytics.ticketData}
          />

          <RecentActivity
            metrics={recent}
          />
        </>
      )}

      {user.role !== "SYSTEM_ADMINISTRATOR" && (
        <div className="action-cards">

          <div className="action-card">
            <h3>Solar Sites</h3>

            <p>
              View and manage solar sites.
            </p>

            <a href="/sites">
              View All Sites
            </a>
          </div>

          <div className="action-card">
            <h3>Maintenance Tickets</h3>

            <p>
              View maintenance tickets.
            </p>

            <a href="/tickets">
              Go to Tickets
            </a>
          </div>

        </div>
      )}

    </div>
  );
};