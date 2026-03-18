import { useState, useCallback, useRef } from "react";
import { improveTextWithGroq, GroqError } from "../../../service/ai-agent";

export type ImproveStatus = "idle" | "loading" | "success" | "error";

export interface UseImproveTextReturn {
  status: ImproveStatus;
  error: string | null;
  improve: (text: string) => Promise<string | null>;
  undo: () => string | null;
  reset: () => void;
}

export interface UseImproveTextOptions {
  apiKey: string;
  historyDepth?: number;
}

export function useImproveText({
  apiKey,
  historyDepth = 1,
}: UseImproveTextOptions): UseImproveTextReturn {
  const [status, setStatus] = useState<ImproveStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const historyRef = useRef<string[]>([]);

  const improve = useCallback(
    async (text: string): Promise<string | null> => {
      if (!text.trim()) return null;

      setStatus("loading");
      setError(null);

      try {
        const improved = await improveTextWithGroq(text, apiKey);

        historyRef.current = [text, ...historyRef.current].slice(
          0,
          historyDepth
        );

        setStatus("success");
        return improved;
      } catch (err) {
        const message =
          err instanceof GroqError
            ? err.message
            : "Произошла неизвестная ошибка";

        setError(message);
        setStatus("error");
        return null;
      }
    },
    [apiKey, historyDepth]
  );

  const undo = useCallback((): string | null => {
    if (historyRef.current.length === 0) return null;
    const [previous, ...rest] = historyRef.current;
    historyRef.current = rest;
    if (historyRef.current.length === 0) setStatus("idle");
    return previous;
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    historyRef.current = [];
  }, []);

  return {
    status,
    error,
    improve,
    undo,
    reset,
  };
}
