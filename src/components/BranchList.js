import { useState, useEffect } from "react"
import { fetchBranches } from "../services/branch"

export default function BranchList() {
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchBranches();
    },[])
    const fetchBranches = () => {
        fetchBranches
        .get(`http://localhost:56859/api/branches`)
        .then((branches) => {
            setBranches(branches.data);
            console.log(branches);
        })
        .catch((err) => console.error(err));
    }
    return (
        <div>
            <ul>
                {/* {branches.map(branches) => ( */}
                
            </ul>
        </div>
    )
}