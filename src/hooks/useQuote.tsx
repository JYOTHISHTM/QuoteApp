// src/hooks/useQuote.ts
import { useState, useEffect, useCallback } from "react";

interface Quote {
    id: number;
    quote: string;
    author: string;
}

const SHEET_ID = import.meta.env.VITE_SHEET_ID;

export const useQuote = () => {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchQuote = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

            const response = await fetch(url);
            const text = await response.text();

            const json = JSON.parse(text.substring(47, text.length - 2));

            const rows = json.table.rows.map((row: any) => ({
                id: Number(row.c[0].v),
                quote: row.c[1].v,
                author: row.c[2].v,
            })) as Quote[];

            const random = rows[Math.floor(Math.random() * rows.length)];

            setQuote(random);
        } catch (err: any) {
            setError(err.message || "Failed to fetch from Google Sheets");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchQuote();
    }, [fetchQuote]);

    return { quote, loading, error, fetchQuote };
};
