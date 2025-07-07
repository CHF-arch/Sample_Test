import { useState, useEffect } from "react"
import { createBranch, fetchBranches } from "../services/branch"
import { API_BASE_URL } from "../config/api"
import styles from "../styles/branch.module.css"

export default function BranchList() {
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [branchCode, setBranchCode] = useState('')
    const [branchTitle, setBranchTitle] = useState('')
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
    function addBranch() {
        if (branchCode.trim() === '' && branchTitle.trim() === ''){
            return;
        }
        const newBranch = {
            branchTitle: branchTitle,
            branchCode: branchCode
        }
        setBranches([...branches, newBranch]);
        setBranchCode('');
        setBranchTitle('');
        
    }
   
    const handleAdd = (e) => {
        e.preventDefault();
        addBranch();
        const data = createBranch(branchTitle, branchCode)
    };

    return (
        <div>
            <h1>Api Connection</h1>
            
            <ul>
                {branches.map((branch) => (
                    <li key={branch.Id} className={styles.list}>
                        Title : {branch.Title}
                            <br />                      
                        Code : {branch.Code}
                    </li>
                ))}                
            </ul>
            <form onSubmit={handleAdd}>
                <p className={styles.input_text}>Title :
                <input
                    value={branchTitle}
                    onChange={(e) => setBranchTitle(e.target.value)}
                    placeholder="Add Title" 
                    type="text"
                />
                <br />
                Code : 
                <input  
                    value={branchCode}
                    onChange={(e) => setBranchCode(e.target.value)}
                    placeholder="Add Code"
                    type="text"
                    className={styles.inputs} 
                />
                </p>
            
                <button className={styles.add} type="submit">Add Branch</button>
            </form>
        </div>
    )
}