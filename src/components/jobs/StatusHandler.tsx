import React from "react";

/**
 * Renders a styled status label based on the provided status code.
 *
 * @param props - The component props
 * @param props.status - The status code used to determine the label and styling
 * @returns A styled span element representing the status
 *
 * @example
 * ```tsx
 * <StatusHandler status={1} />
 * ```
 *
 * Status Codes:
 * - `1`: Displays "Hold" with yellow styling
 * - `2`: Displays "Active" with green styling
 * - `3`: Displays "Closed by Client" with red styling
 * - `4`: Displays "Filled" with blue styling
 * - Default: Displays "Active" with green styling
 */
const StatusHandler: React.FC<{ status: number }> = ({ status }) => {
  switch (status) {
    case 1:
      return (
        <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">
          Hold
        </span>
      );
    case 2:
      return (
        <span className="px-2 py-1 rounded-full bg-green-100 text-green-600">
          Active
        </span>
      );
    case 3:
      return (
        <span className="px-2 py-1 rounded-full bg-red-300 text-red-600">
          Closed by Client
        </span>
      );
    case 4:
      return (
        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600">
          Filled
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 rounded-full bg-green-100 text-green-600">
          Active
        </span>
      );
  }
};

export default StatusHandler;
