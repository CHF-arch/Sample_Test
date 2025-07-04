import { useState, useEffect } from "react"
import { fetchBranches } from "../services/branch"
import { API_BASE_URL } from "../config/api";

export default function BranchList() {
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState(null)

    useEffect(() => {
        loadBranches();
    },[])

    const loadBranches = async () => {
        setIsLoading(true);
        try {
            const branchesData = await fetchBranches();
            setBranches(branchesData)
            setIsLoading(false)
        } catch(err) {
            setIsLoading(false)
            setError(err.message)
        }
    }

    if(isLoading) return <div>Loading Branches...</div>

    return (
        <div>
            <ul>
                {branches.map((branch) => (
                    <li key={branch.Id}>
                        Title: {branch.Title}
                    </li>
                ))}
                
            </ul>
        </div>
    )
}