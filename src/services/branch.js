import { API_BASE_URL } from "../config/api";

export async function fetchBranches(){
    const response = await fetch(`${API_BASE_URL}/branches`);
    
    if (!response.ok){
        throw new Error("Failed")
    }
    const result = await response.json();
    return result;
}
export async function postBranches(){
        
}