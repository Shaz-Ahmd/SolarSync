import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import EmptyState from "../common/EmptyState";
import MaintenanceTicketForm from "./MaintenanceTicketForm";

import {
  fetchTickets,
  startWork,
  resolveTicket,
  clearError,
} from "../../store/slices/ticketSlice";

const MaintenanceTicketList = () => {

  const dispatch = useDispatch();

  const ticketState = useSelector(
    (state) =>
      state.tickets || {}
  );

  const tickets =
    Array.isArray(ticketState.items)
      ? ticketState.items
      : [];

  const loading =
    ticketState.loading || false;

  const error =
    ticketState.error;

  const { user } =
    useSelector(
      (state) => state.auth
    );

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    successNotification,
    setSuccessNotification,
  ] = useState("");

  /*
   * LOAD TICKETS
   */
  useEffect(() => {

    dispatch(fetchTickets());

  }, [dispatch]);

  /*
   * CLEAR ERROR AFTER 5 SECONDS
   */
  useEffect(() => {

    if (!error) {
      return;
    }

    const timer =
      setTimeout(() => {

        dispatch(clearError());

      }, 5000);

    return () =>
      clearTimeout(timer);

  }, [error, dispatch]);

  /*
   * CLEAR SUCCESS NOTIFICATION AFTER 4 SECONDS
   */
  useEffect(() => {
    if (!successNotification) {
      return;
    }

    const timer = setTimeout(() => {
      setSuccessNotification("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [successNotification]);

  /*
   * START WORK
   */
  const handleStartWork = async (
    ticketId
  ) => {

    const confirmed =
      window.confirm(
        "Start working on this maintenance ticket?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await dispatch(
        startWork(ticketId)
      ).unwrap();

    } catch (error) {

      console.error(
        "Failed to start work:",
        error
      );
    }
  };

  /*
   * RESOLVE TICKET
   */
  const handleResolve = async (
    ticketId
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure the maintenance work is completed?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await dispatch(
        resolveTicket(ticketId)
      ).unwrap();

      setSuccessNotification("Ticket resolved successfully.");

    } catch (error) {

      console.error(
        "Failed to resolve ticket:",
        error
      );
    }
  };

  /*
   * USER ROLES
   */
  const isTechnician =
    user?.role ===
    "MAINTENANCE_TECHNICIAN";

  const isSolarOperator =
    user?.role ===
    "SOLAR_OPERATOR";

  return (

    <div className="container">

      {/* SUCCESS NOTIFICATION */}
      {successNotification && (
        <div className="top-right-notification">
          ✓ {successNotification}
        </div>
      )}

      {/* HEADER */}

      <div className="page-header">

        <h1>
          Maintenance Tickets
        </h1>

        {/* ONLY OPERATOR CAN REPORT */}

        {isSolarOperator && (
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              setShowForm(true)
            }
          >
            + Report Issue
          </button>
        )}

      </div>

      {/* ERROR */}

      {error && (
        <div className="error-message">

          {typeof error ===
          "string"
            ? error
            : error?.message ||
              error?.error ||
              error?.detail ||
              "Ticket operation failed."}

        </div>
      )}

      {/* LOADING */}

      {loading ? (

        <div className="loading-state">
          Loading tickets...
        </div>

      ) : tickets.length === 0 ? (

        <EmptyState
          message="No maintenance tickets found."
          onAction={() =>
            isSolarOperator &&
            setShowForm(true)
          }
        />

      ) : (

        <table>

          <thead>

            <tr>

              <th>
                Site
              </th>

              <th>
                Panel ID
              </th>

              <th>
                Description
              </th>

              <th>
                Priority
              </th>

              <th>
                Status
              </th>

              <th>
                Technician
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {tickets.map(
              (ticket) => {

                const isAssignedToCurrentTechnician =
                  isTechnician &&
                  ticket.technician?.username ===
                    user?.username;

                return (

                  <tr
                    key={ticket.id}
                  >

                    {/* SITE */}

                    <td>

                      {ticket.site
                        ?.siteName ||
                        "N/A"}

                    </td>

                    {/* PANEL */}

                    <td>

                      {ticket.panel
                        ?.id
                        ? `#${ticket.panel.id}`
                        : "N/A"}

                    </td>

                    {/* DESCRIPTION */}

                    <td>

                      {ticket.issueDescription}

                    </td>

                    {/* PRIORITY */}

                    <td>

                      <span
                        className={`badge badge-priority-${String(
                          ticket.priority ||
                            ""
                        )
                          .toLowerCase()
                          .replace(
                            /_/g,
                            "-"
                          )}`}
                      >

                        {ticket.priority}

                      </span>

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={`badge badge-status-${String(
                          ticket.status ||
                            ""
                        )
                          .toLowerCase()
                          .replace(
                            /_/g,
                            "-"
                          )}`}
                      >

                        {ticket.status}

                      </span>

                    </td>

                    {/* TECHNICIAN */}

                    <td>

                      {ticket.technician
                        ?.username ||
                        "Unassigned"}

                    </td>

                    {/* ACTIONS */}

                    <td>

                      {/* 
                       * TECHNICIAN:
                       *
                       * OPEN → START WORK
                       */}

                      {isAssignedToCurrentTechnician &&
                        ticket.status ===
                          "OPEN" && (

                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() =>
                            handleStartWork(
                              ticket.id
                            )
                          }
                          disabled={
                            loading
                          }
                        >
                          Start Work
                        </button>

                      )}

                      {/* 
                       * TECHNICIAN:
                       *
                       * IN_PROGRESS →
                       * RESOLVE
                       */}

                      {isAssignedToCurrentTechnician &&
                        ticket.status ===
                          "IN_PROGRESS" && (

                        <button
                          type="button"
                          className="btn-success"
                          onClick={() =>
                            handleResolve(
                              ticket.id
                            )
                          }
                          disabled={
                            loading
                          }
                        >
                          Resolve Ticket
                        </button>

                      )}

                      {/* 
                       * RESOLVED:
                       *
                       * Nothing to do.
                       */}

                      {ticket.status ===
                        "RESOLVED" && (
                        <span>
                          —
                        </span>
                      )}

                      {/* 
                       * ADMIN:
                       *
                       * No Start Work.
                       * No Resolve.
                       */}

                      {user?.role ===
                        "SYSTEM_ADMINISTRATOR" &&
                        ticket.status !==
                          "RESOLVED" && (
                          <span>
                            —
                          </span>
                        )}

                    </td>

                  </tr>

                );
              }
            )}

          </tbody>

        </table>

      )}

      {/* REPORT FORM */}

      {showForm && (

        <MaintenanceTicketForm
          onClose={() =>
            setShowForm(false)
          }
        />

      )}

    </div>
  );
};

export default MaintenanceTicketList;