export const fetchDestinations = async () => {
  try {
      const response = await fetch('http://localhost:5000/api/destinations');
      if (!response.ok) throw new Error('Failed to fetch destinations');
      return await response.json();
  } catch (error) {
      console.error(error);
      return [];
  }
};
