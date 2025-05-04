import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  //   getPaginationRowModel,
  ColumnDef,
  flexRender,
  PaginationState,
  RowSelectionState,
} from "@tanstack/react-table";
import { Job } from "@/types/jobs";
import { useState } from "react";
import { useGetJobs } from "@/api/jobs";
import StatusHandler from "@/components/jobs/StatusHandler";

/**
 * Renders a paginated and filterable list of jobs using a table.
 * Integrates with a custom hook `useGetJobs` to fetch job data and uses
 * TanStack Table for table management, including pagination, row selection,
 * and global filtering.
 *
 * @example
 * ```tsx
 * import JobsList from './JobList';
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <JobsList />
 *     </div>
 *   );
 * };
 * ```
 *
 * @remarks
 * The table supports:
 * - Row selection
 * - Global filtering
 * - Manual pagination
 * - Pagination controls for navigation and page size adjustment
 * - Dynamically defined columns with custom renderers for specific fields
 *
 * ### Dependencies
 * - `useGetJobs` - Custom hook for fetching job data
 * - `@tanstack/react-table` - Library for managing table state and rendering
 * - `StatusHandler` - Component for rendering job status
 *
 * ### State Management
 * - `pageIndex` (number): Current page index for pagination
 * - `pageSize` (number): Number of rows per page
 * - `rowSelection` (RowSelectionState): State for selected rows
 * - `globalFilter` (string): Global filter value for searching jobs
 *
 * ### Error Handling
 * - Displays error message if data fetching fails
 * - Shows loading state during data fetch
 *
 * ### Features
 * - Search functionality via global filter
 * - Pagination controls
 * - Row selection
 * - Dynamic column rendering
 *
 * @returns The rendered JobsList component
 */
const JobsList = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data, isLoading, isError, error } = useGetJobs({
    page: pageIndex,
    pageSize,
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const pagination = {
    pageIndex,
    pageSize,
  };
  // Define columns
  const columns: ColumnDef<Job>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          disabled={!row.getCanSelect()}
        />
      ),
    },
    {
      accessorKey: "job_title",
      header: "Job Title",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "level",
      header: "Level",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "city",
      header: "Location",
      cell: (info) => `${info.row.original.city}, ${info.row.original.state}`,
    },
    {
      accessorKey: "employment_type",
      header: "Type",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: (info) => `${info.getValue()} months`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() as number;
        return <StatusHandler status={status} />;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Posted Date",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns,
    state: {
      pagination,
      rowSelection,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: data ? Math.ceil(data.total / pageSize) : 0,
    // initialState: {
    //   pagination: {
    //     pageSize: 10,
    //   },
    // },
  });

  //   const selectedJobs = table.getSelectedRowModel().flatRows.map(row => row.original);

  if (isLoading) return <div className="p-4">Loading jobs...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-2 border rounded w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            «
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ‹
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            ›
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            »
          </button>
        </div>

        <span className="flex items-center gap-1 text-sm">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>

        <select
          className="px-2 py-1 border rounded text-sm"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default JobsList;
