import { Talent } from "@/types/talents";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios"

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

export interface FetchTalentsParams {
    /** Page number to fetch (0-based) */
    page?: number;
    /** Number of items per page */
    pageSize?: number;
    /** Search term to filter jobs */
    search?: string;
}

const fetchJobs = async (params: FetchTalentsParams = {}): Promise<PaginatedResponse<Talent>> => {
    const {page = 0, pageSize = 10} = params;
    const response = await axios.get(`/candidates/${page}/${pageSize}?orderby=createdAt&direction=desc`);
    return {
        data: response.data.candidates,
        total: response.data.total,
        page: response.data.page,
        error: response.data.error
    }
}

export const useGetTalents = (params: FetchTalentsParams = {}) => {
    return useQuery({
        queryKey: ['talents', params],
        queryFn: () => fetchJobs(params),
        staleTime: 1000 * 60 *5
    })
}