import { API_BASE_URL } from "../config/api";

export async function fetchBranches() {
  const response = await fetch(`${API_BASE_URL}/branches`);

  if (!response.ok) {
    throw new Error("Failed");
  }
  const result = await response.json();
  return result;
}

export async function createBranch(branchTitle, branchCode) {
  const response = await fetch(`${API_BASE_URL}/branches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Title: branchTitle, Code: branchCode }),
  });
  return response;
}
export async function deleteBranch(branchId) {
  const response = await fetch(`${API_BASE_URL}/branches/${branchId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.branchId,
  });
  return response;
}
export async function updateBranch(branchId, branchTitle, branchCode) {
  const response = await fetch(`${API_BASE_URL}/branches/${branchId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Title: branchTitle, Code: branchCode }),
  });
  return response;
}
