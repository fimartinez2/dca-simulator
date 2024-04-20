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
    <table className="w-full ">
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
  );
};

export default WalletTable;
