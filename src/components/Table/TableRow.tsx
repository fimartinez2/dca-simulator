import dateFormat from "@/helpers/functions/dateFormat";
import formatMoney from "@/helpers/functions/formatMoney";
import { WalletItem } from "@/interface/wallet";
import { useGraphConfig } from "@/store/graphConfigStore";

const WalletTableRow = (props: WalletItem) => {
  const {
    date,
    totalInvestment,
    totalBought,
    priceToDate,
    totalValue,
    totalProfit,
    profitPercentage,
    currency,
  } = props;

  const { market } = useGraphConfig();

  return (
    <tr className="h-14 px-2 border-t odd:bg-slate-600 text-center">
      <td className="px-3">{dateFormat(date)}</td>
      <td className="px-3">
        {formatMoney(Math.round(priceToDate * 100) / 100, market.split("-")[1])}
      </td>
      <td className="px-3">
        {formatMoney(
          Math.round(totalInvestment * 100) / 100,
          market.split("-")[1]
        )}
      </td>
      <td className="px-3 bg-indigo-500 font-semibold">
        {formatMoney(Math.round(totalValue * 100) / 100, market.split("-")[1])}
      </td>
      <td
        className={`px-3 font-medium ${
          profitPercentage < 0 ? "text-red-600" : "text-green-600"
        }`}
      >
        {formatMoney(Math.round(totalProfit * 100) / 100, market.split("-")[1])}
      </td>
      <td
        className={`px-3 font-medium ${
          profitPercentage < 0 ? "text-red-600" : "text-green-600"
        }`}
      >{`${Math.round(profitPercentage * 100) / 100} %`}</td>
    </tr>
  );
};

export default WalletTableRow;
