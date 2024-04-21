import { getAllTrades, getMarkets } from "@/service/markets";
import { Inter } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useGraphConfig } from "@/store/graphConfigStore";
import LineChart from "@/components/LineChart";
import { createWalletDCA } from "@/helpers/functions/createWallet";
import SelectBox from "@/components/SelectBox";
import DateInput from "@/components/DateInput";
import { useWalletStore } from "@/store/walletStore";
import { NumberInput } from "@/components/NumberInput";
import WalletTable from "@/components/Table";
import useDebounce from "@/hooks/useDebounce";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    market,
    interval,
    startDate,
    endDate,
    setMarket,
    setInterval,
    setStartDate,
    setEndDate,
  } = useGraphConfig();

  const { wallet, setWallet } = useWalletStore();

  const debouncedStartDate = useDebounce(startDate, 1000);
  const debouncedEndDate = useDebounce(endDate, 1000);
  const { data, error } = useQuery({
    queryFn: getAllTrades,
    queryKey: [
      "marketQuery",
      market,
      interval,
      debouncedStartDate,
      debouncedEndDate,
    ],
    retry: false,
  });

  const [investmentAmount, setInvestmentAmount] = useState(1000000);

  const { data: markets } = useQuery({
    queryFn: getMarkets,
    queryKey: ["markets"],
  });

  useEffect(() => {
    if (!data) return;
    setWallet(createWalletDCA(data, investmentAmount));
  }, [data, investmentAmount]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full gap-5 items-center justify-between font-mono text-sm flex flex-col">
        <div>
          <NumberInput
            label="Investment Amount"
            prefix={market.split("-")[1]}
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
          />
        </div>
        <div className="flex gap-2">
          <DateInput
            label="Start Date"
            setExternalValue={setStartDate}
            value={startDate}
          />
          <DateInput
            label="End Date"
            setExternalValue={setEndDate}
            value={endDate}
          />
          <div>
            <SelectBox
              label="Market"
              options={
                markets?.markets.map((market) => ({
                  id: market.id,
                  label: market.name,
                })) ?? []
              }
              setExternalValue={setMarket}
              placeholder="Select Market"
              defaultValue={{ id: 1, label: "BTC-CLP" }}
              className="!uppercase"
            />
          </div>
          <div>
            <SelectBox
              label="Interval"
              options={[
                { id: 1, label: "daily" },
                { id: 2, label: "weekly" },
                { id: 3, label: "monthly" },
                { id: 4, label: "yearly" },
              ]}
              //@ts-ignore
              setExternalValue={setInterval}
              placeholder="Select Interval"
              defaultValue={{ id: 3, label: "monthly" }}
            />
          </div>
        </div>
        <div className="min-h-[700px] flex flex-col justify-center items-center">
          {error && <p>Error: {error.message}</p>}

          <LineChart
            width={900}
            height={600}
            startDate={startDate}
            endDate={endDate}
            data={wallet.map((dot, index) => {
              return {
                x: dot.date,
                y: dot.totalValue,
              };
            })}
            investment={wallet.map((dot, index) => {
              return {
                x: dot.date,
                y: dot.totalInvestment,
              };
            })}
          />
        </div>
      </div>
      <WalletTable wallet={wallet} />
    </main>
  );
}
