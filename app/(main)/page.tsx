"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { GetSessions } from "@/data/supabase";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  // Fetch all sessions and display them or empty state if none created
  const [sessions, setSessions] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await GetSessions();
      if (error) {
        console.log("Error fetching data", error.message);
      } else {
        setSessions(data);
      }
      setLoading(false);
    };

    fetchSessions();
  }, []);

  const SkeletonCard = () => (
    <Card className="max-w-sm col-span-3">
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 space-y-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-black text-xl">
          An overview of all the student sessions
        </h1>
        <p className="text-muted-foreground max-w-lg">
          Here you can see all the different sessions created by the teachers at
          your institution
        </p>
      </div>
      <section className="grid grid-cols-12 gap-4">
        {/* Hvis stadig loader, eller ingen sessions endnu */}
        {(loading || !sessions?.length) &&
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}

        {/* Når data er hentet og sessions findes */}
        {!loading &&
          sessions?.length > 0 &&
          sessions.map(
            ({
              id,
              title,
              description,
              subject,
              starts_at,
              ends_at,
              location,
            }) => (
              <Card className="max-w-sm col-span-3" key={id}>
                <CardContent className="space-y-2">
                  <CardTitle className="text-primary text-lg">
                    {subject}
                  </CardTitle>
                  <h2 className="font-semibold">{title}</h2>
                  <span className="font-semibold">Mødetid:</span>

                  <h2 className="font-light">
                    {new Date(starts_at).toLocaleTimeString("dk-DK", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}{" "}
                    -{" "}
                    {new Date(ends_at).toLocaleTimeString("dk-DK", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </h2>

                  <h2 className="font-light">{location}</h2>
                </CardContent>
              </Card>
            )
          )}
      </section>
    </div>
  );
};

export default Home;
