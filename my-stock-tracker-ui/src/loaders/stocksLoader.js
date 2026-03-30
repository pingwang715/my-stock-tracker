import apiClient from "../service/apiClient";

export async function stocksLoader() {
  try {
    const response = await apiClient.get("/stocks");
    return response.data
  } catch (error) {
    throw new Response(
      error.message || "Failed to fetch stocks. Please try again.",
      { status: error.status || 500}
    );
  }
}
