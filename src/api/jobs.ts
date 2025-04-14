import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query";

// Fetch all jobs
const fetchJobs = async () => {
    const {data} = await axios.get('/jobs/position1?page=0&limit=20')
    return data.jobPositions;
};

export const useGetJobs = () => {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: fetchJobs,
        staleTime: 1000 * 60 *5 // 5 minutes
    })
}