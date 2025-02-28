import { useCallback, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface UseBackendFetch {
  api: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}
export function useBackendFetch<DataType, BodyType>({
  api,
  method = "GET",
}: UseBackendFetch) {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const fetchData = useCallback(
    async (body?: BodyType) => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios(
          `${process.env.NEXT_PUBLIC_API_URL}${api}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken ?? ""}`,
            },
            method,
            data: body ?? undefined,
          }
        );
        setData(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          console.error(error);
          setError("An unknown error has occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    },
    [api, method, session]
  );

  return { data, loading, error, fetchData };
}
