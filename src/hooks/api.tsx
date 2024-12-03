import { useQuery } from "@tanstack/react-query";

const fetchCharacters = async (query: string) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${query}`
  );
  if (!response.ok) throw new Error("Network error");
  return response.json();
};

export const useCharacters = (query: string) => {
  return useQuery({
    queryKey: ["characters", query],
    queryFn: () => fetchCharacters(query),
    enabled: !!query,
  });
};
