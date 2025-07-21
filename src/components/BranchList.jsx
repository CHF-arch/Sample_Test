import { useState, useEffect } from "react";
import { createBranch, fetchBranches, deleteBranch } from "../services/branch";
import styles from "../styles/branch.module.css";
import EditBranch from "./EditBranch";

export default function BranchList() {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [branchCode, setBranchCode] = useState("");
  const [branchTitle, setBranchTitle] = useState("");
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBranch, setEditingBranch] = useState();

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    setIsLoading(true);
    try {
      const branchesData = await fetchBranches();
      setBranches(branchesData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };
  if (isLoading) return <div>Loading Branches...</div>;

  const handleAdd = async (e) => {
    e.preventDefault();
    if (branchCode.trim() === "" && branchTitle.trim() === "") {
      return;
    }
    const newBranch = {
      branchTitle: branchTitle,
      branchCode: branchCode,
    };
    setBranches([...branches, newBranch]);
    setBranchCode("");
    setBranchTitle("");
    await createBranch(branchTitle, branchCode);
    await loadBranches();
  };

  const handleEdit = async (branch) => {
    setEditingBranch(branch);
    setIsEditing(true);
  };
  async function branchDelete(branchIdToDelete) {
    try {
      await deleteBranch(branchIdToDelete);
      const updatedBranch = branches.filter(
        (branch) => branch.Id !== branchIdToDelete
      );
      setBranches(updatedBranch);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  }
  return (
    <div className={styles.container}>
      <h1>Api Connection</h1>
      <form onSubmit={handleAdd} className={styles.formContainer}>
        <p className={styles.input_text}>
          Title :
          <input
            value={branchTitle}
            onChange={(e) => setBranchTitle(e.target.value)}
            placeholder="Add Title"
            type="text"
            className={styles.inputs}
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

        <button className={styles.add} type="submit">
          Add Branch
        </button>
      </form>
      <ul>
        {branches.map((branch) => (
          <li key={branch.Id} className={styles.list}>
            Title : {branch.Title}
            <br />
            Code : {branch.Code}
            <br />
            <button
              className={styles.update}
              onClick={() => handleEdit(branch)}
            >
              Update
            </button>
            <button
              className={styles.delete}
              onClick={() => branchDelete(branch.Id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {isEditing && editingBranch && (
        <EditBranch
          Id={editingBranch.Id}
          Title={editingBranch.Title}
          Code={editingBranch.Code}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}
