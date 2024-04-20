import { getAllTrades, getMarkets } from "@/service/markets";
import { Inter } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useGraphConfig } from "@/store/graphConfigStore";
import LineChart from "@/components/LineChart";
import { createWalletDCA } from "@/helpers/functions/createWallet";
import SelectBox from "@/components/SelectBox";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { market, interval, startDate, endDate, setMarket } = useGraphConfig();
  const { data } = useQuery({
    queryFn: getAllTrades,
    queryKey: ["marketQuery", market, interval, startDate, endDate],
  });

  const { data: markets } = useQuery({
    queryFn: getMarkets,
    queryKey: ["markets"],
  });

  useEffect(() => {
    if (!data) return;
    const wallet = createWalletDCA(data, 1000000);
    console.log(wallet);
  }, [data]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
        <div className="flex gap-2">
          <div>
            <SelectBox
              name="market"
              label="Market"
              options={
                markets?.markets.map((market) => ({
                  id: market.id,
                  label: market.name,
                })) ?? []
              }
              setExternalValue={setMarket}
              placeholder="Select Market"
            />
          </div>
        </div>
        {data && (
          <LineChart
            width={800}
            height={400}
            startDate={startDate}
            endDate={endDate}
            data={createWalletDCA(data, 1000000).map((dot, index) => {
              return {
                x: index,
                y: dot.totalValue,
              };
            })}
            investment={createWalletDCA(data, 1000000).map((dot, index) => {
              return {
                x: index,
                y: dot.totalInvestment,
              };
            })}
          />
        )}
      </div>
    </main>
  );
}
