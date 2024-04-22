import { useGraphConfig } from "@/store/graphConfigStore";
import DateInput from "./DateInput";
import SelectBox from "./SelectBox";
import { getMarkets } from "@/service/markets";
import { useQuery } from "@tanstack/react-query";

const Inputs = () => {
  const {
    startDate,
    endDate,
    setMarket,
    setInterval,
    setStartDate,
    setEndDate,
  } = useGraphConfig();

  const { data: markets } = useQuery({
    queryFn: getMarkets,
    queryKey: ["markets"],
  });

  return (
    <div className="flex flex-col gap-2 xl:flex-col lg:flex-row sm:flex-col w-50  sm:w-full">
      <div className="flex flex-col gap-2 sm:flex-row md:flex-row xl:flex-col">
        <div className="w-full">
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
      <div className="flex flex-col gap-2 sm:flex-row w-full md:flex-row xl:flex-col">
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
      </div>
    </div>
  );
};

export default Inputs;
