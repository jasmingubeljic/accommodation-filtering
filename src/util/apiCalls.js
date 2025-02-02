export const getAccommodations = async (onSuccess, onError) => {
  try {
    const response = await fetch("https://api.adriatic.hr/test/accommodation");

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    const r = await response.json();
    onSuccess(r);
  } catch (error) {
    onError(
      error instanceof Error ? error : new Error("Unknown error occurred")
    );
  }
};
