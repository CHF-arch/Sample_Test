import { useState } from "react";
import { updateBranch } from "../services/branch";
import styles from "../styles/Edit.module.css";

function EditBranch({ Id, Title, Code, setIsEditing }) {
  const [title, setTitle] = useState(Title);
  const [code, setCode] = useState(Code);
  function handleSubmit() {
    updateBranch(Id, title, code);
  }
  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <div className={styles.inputContainer}>
          <p className={styles.inputTitles}>Title : </p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.editInputs}
          />
          <p>Code : </p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={styles.editInputs}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.editButtons}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <button type="submit" className={styles.editButtons}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBranch;
