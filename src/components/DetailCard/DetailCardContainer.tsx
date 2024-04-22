import formatMoney from "@/helpers/functions/formatMoney";
import DetailCard from ".";
import { WalletItem } from "@/interface/wallet";

const DetailCardContainer = (props: {
  wallet: WalletItem;
  currency: string;
}) => {
  const { wallet, currency } = props;
  return (
    <div className="flex gap-2 flex-wrap w-full justify-center ">
      <DetailCard
        title="Total Investment"
        value={formatMoney(wallet.totalInvestment, currency)}
        icon="💸"
      />
      <DetailCard
        title="Profit"
        value={formatMoney(wallet.totalProfit, currency)}
        icon="💰"
      />
      <DetailCard
        title="Wallet performance"
        value={`${wallet.profitPercentage > 0 ? "+" : ""}${
          Math.round(wallet.profitPercentage * 100) / 100
        }%`}
        icon="📈"
      />
      <DetailCard
        title="Wallet Value"
        value={formatMoney(wallet.totalValue, currency)}
        icon="💼"
      />
    </div>
  );
};

export default DetailCardContainer;
