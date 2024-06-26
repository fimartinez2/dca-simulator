import { getAllTrades } from "@/service/markets";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useGraphConfig } from "@/store/graphConfigStore";
import LineChart from "@/components/LineChart";
import { createWalletDCA } from "@/helpers/functions/createWallet";
import { useWalletStore } from "@/store/walletStore";
import WalletTable from "@/components/Table";
import useDebounce from "@/hooks/useDebounce";
import Inputs from "@/components/Inputs";
import NumberInput from "@/components/Inputs/NumberInput";
import { Inter } from "next/font/google";
import useWindowDimensions from "@/hooks/useWindowDimesions";
import DetailCardContainer from "@/components/DetailCard/DetailCardContainer";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { market, interval, startDate, endDate } = useGraphConfig();

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
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (!data) return;
    setWallet(createWalletDCA(data, investmentAmount));
  }, [data, investmentAmount]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between py-14 px-2 sm:px-10 lg:px-24  ${inter.className}`}
    >
      <div className="z-10 w-full gap-5 items-center justify-between font-mono text-sm flex flex-col xl:flex-row h-fit">
        <div className="flex flex-col items-start justify-between h-full relative">
          <div className="flex-grow xl:absolute xl:-top-40 flex items-center xl:mb-0 mb-5  gap-2 xl:block">
            <p className="text-6xl">DCA</p>
            <p className="text-2xl">Simulator</p>
          </div>
          <NumberInput
            label="Investment Amount"
            prefix={market.split("-")[1]}
            value={investmentAmount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInvestmentAmount(Number(e.target.value))
            }
          />
          <Inputs />
        </div>
        <div className="min-h-[700px] flex flex-col-reverse justify-center items-center sm:flex-col">
          <DetailCardContainer
            wallet={wallet[wallet.length - 1]}
            currency={market.split("-")[1]}
          />
          {error && <p className="text-red-500 my-5">Error: {error.message}</p>}
          {width && (
            <LineChart
              width={
                width > 1279 ? width - 500 : width > 600 ? width - 100 : width
              }
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
          )}
        </div>
      </div>
      <WalletTable wallet={wallet} />
    </main>
  );
}
