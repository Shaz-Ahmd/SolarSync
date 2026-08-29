import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EmptyState from "../common/EmptyState";
import MaintenanceTicketForm from "./MaintenanceTicketForm";

import {
  fetchTickets,
  resolveTicket,
  clearError,
} from "../../store/slices/ticketSlice";

const MaintenanceTicketList = () => {
  const dispatch = useDispatch();

  const {
    tickets = [],
    loading,
    error,
  } = useSelector(
    (state) => state.tickets
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const [showForm, setShowForm] =
    useState(false);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleResolve = (ticketId) => {
    if (
      window.confirm(
        "Are you sure you want to mark this ticket as resolved?"
      )
    ) {
      dispatch(resolveTicket(ticketId));
    }
  };

  return (
    <div className="container">

      <div className="page-header">
        <h1>Maintenance Tickets</h1>

        {user?.role === "SOLAR_OPERATOR" && (
          <button
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Report Issue
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          Loading tickets...
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState
          message="No maintenance tickets found."
          onAction={() => setShowForm(true)}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Site</th>
              <th>Panel ID</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Technician</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>

                <td>
                  {ticket.site?.siteName}
                </td>

                <td>
                  #{ticket.panel?.id}
                </td>

                <td>
                  {ticket.issueDescription}
                </td>

                <td>
                  <span className="badge">
                    {ticket.priority}
                  </span>
                </td>

                <td>
                  <span className="badge">
                    {ticket.status}
                  </span>
                </td>

                <td>
                  {ticket.technician?.username ||
                    "Unassigned"}
                </td>

                <td>
                  {ticket.status !== "RESOLVED" &&
                    user?.role ===
                      "MAINTENANCE_TECHNICIAN" &&
                    ticket.technician?.username ===
                      user.username && (
                      <button
                        className="btn-success"
                        onClick={() =>
                          handleResolve(ticket.id)
                        }
                      >
                        Resolve Ticket
                      </button>
                    )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <MaintenanceTicketForm
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
};

export default MaintenanceTicketList;