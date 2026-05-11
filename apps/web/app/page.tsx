"use client";

import { useEffect, useState } from "react";

type Beat = {
  id: string;
  title: string;
  producerName: string;
  audioUrl: string;
  artworkUrl: string;
  bpm: number | null;
  durationSeconds: number;
  tags: string[];
};

export default function Home() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${apiUrl}/beats`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBeats(data.beats);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <main className="p-8">Loading beats...</main>;
  if (error) return <main className="p-8 text-red-500">Error: {error}</main>;

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Crates — Dev Check</h1>
      <p className="text-sm text-gray-500 mb-6">
        Found {beats.length} beats in the database.
      </p>
      <ul className="space-y-3">
        {beats.map((beat) => (
          <li key={beat.id} className="border rounded p-4">
            <div className="font-semibold">{beat.title}</div>
            <div className="text-sm text-gray-600">{beat.producerName}</div>
            <div className="text-xs text-gray-500 mt-1">
              {beat.bpm} BPM · {beat.tags.join(", ")}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}