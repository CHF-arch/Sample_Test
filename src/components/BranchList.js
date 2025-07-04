import { useState, useEffect } from "react"
import { fetchBranches } from "../services/branch"
import { API_BASE_URL } from "../config/api";

export default function BranchList() {
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchBranches();
    },[])
    const fetchBranches = () => {
        fetchBranches
        .get(`${API_BASE_URL}/branches`)
        .then((branches) => {
            setBranches(branches.data);
            console.log(branches);
        })
        .catch((err) => console.error(err));
    }
    return (
        <div>
            <ul>
                {branches.map((branches) => (
                    <li key={branches.id}>
                ))}
                
            </ul>
        </div>
    )
}