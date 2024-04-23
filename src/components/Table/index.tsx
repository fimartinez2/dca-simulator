import { WalletItem } from "@/interface/wallet";
import WalletTableRow from "./TableRow";
import { useGraphConfig } from "@/store/graphConfigStore";

interface Props {
  wallet?: WalletItem[];
}
const WalletTable = (props: Props) => {
  const { wallet } = props;
  const { market } = useGraphConfig();
  return (
    <div className="overflow-x-auto w-full flex mt-5">
      <table className="w-full px-2 min-w-1000">
        <thead className="">
          <tr className="h-14 bg-indigo-500">
            <th className="px-3">Date</th>
            <th className="px-3">{`${market
              .split("-")[0]
              .toUpperCase()} Price`}</th>
            <th className="px-3">Total Investment</th>
            <th className="px-3">Total Value</th>
            <th className="px-3">Total Profit</th>
            <th className="px-3">Profit Percentage</th>
          </tr>
        </thead>
        <tbody className="w-full columns-md">
          {wallet?.map((item, index) => (
            <WalletTableRow key={index} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletTable;
