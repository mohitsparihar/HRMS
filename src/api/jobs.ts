import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query";
import {Job} from "@/types/jobs"

/**
 * Response type for paginated data
 * @template T The type of data being paginated
 */
export interface PaginatedResponse<T> {
    /** Array of items for the current page */
    data: T[];
    /** Total number of items across all pages */
    total: number;
    /** Current page number */
    page: number;
    /** Whether there was an error fetching the data */
    error: boolean
}

/**
 * Parameters for fetching paginated job data
 */
export interface FetchJobsParams {
    /** Page number to fetch (0-based) */
    page?: number;
    /** Number of items per page */
    pageSize?: number;
    /** Search term to filter jobs */
    search?: string;
}

/**
 * Fetches a paginated list of job positions from the server.
 *
 * @param params - An optional object containing query parameters for the request.
 * @param params.page - The page number to fetch (default is 0).
 * @param params.pageSize - The number of items per page (default is 10).
 * @returns A promise that resolves to a paginated response containing job positions.
 *
 * The returned object includes:
 * - `data`: An array of job positions.
 * - `total`: The total number of job positions available.
 * - `page`: The current page number.
 * - `error`: Any error message returned by the server.
 *
 * @throws An error if the request fails.
 */
const fetchJobs = async (params: FetchJobsParams = {}): Promise<PaginatedResponse<Job>> => {
    const {page = 0, pageSize = 10} = params;
    const response = await axios.get('/jobs/position1', {
        params: {
            page, limit: pageSize
        }
    })
    return {
        data: response.data.jobPositions,
        total: response.data.total,
        page: response.data.page,
        error: response.data.error
    }
};

export const useGetJobs = (params: FetchJobsParams = {}) => {
    return useQuery({
        queryKey: ['jobs', params],
        queryFn: () => fetchJobs(params),
        staleTime: 1000 * 60 *5 // 5 minutes
    })
}