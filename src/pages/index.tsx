import { getAllTrades, getMarketTrade } from "@/service/markets";
import { Inter } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useGraphConfig } from "@/store/graphConfigStore";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { market, interval, startDate, endDate } = useGraphConfig();
  const { data, isLoading } = useQuery({
    queryFn: getAllTrades,
    queryKey: ["marketQuery", market, interval, startDate, endDate],
  });

  useEffect(() => {
    if (!data) return;
    console.log(data);
  }, [data]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex lg:flex-col"></div>
    </main>
  );
}
