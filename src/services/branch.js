import { API_BASE_URL } from "../config/api";


export async function fetchBranches(){
    const response = await fetch(`${API_BASE_URL}/branches`);
    
    if (!response.ok){
        throw new Error("Failed")
    }
    const result = await response.json();
    return result;
}

export async function createBranch(data) {
    const response = await fetch("http://localhost:56859/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}