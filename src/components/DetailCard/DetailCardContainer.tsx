import formatMoney from "@/helpers/functions/formatMoney";
import DetailCard from ".";
import { WalletItem } from "@/interface/wallet";

const DetailCardContainer = (props: {
  wallet?: WalletItem;
  currency: string;
}) => {
  const { wallet, currency } = props;
  return (
    <div className="flex gap-2 flex-wrap w-full justify-center py-5 sm:py-0">
      <div className="flex gap-2 flex-wrap justify-center">
        <DetailCard
          title="Total Investment"
          value={formatMoney(wallet?.totalInvestment ?? 0, currency)}
          icon="💸"
        />
        <DetailCard
          title="Profit"
          value={formatMoney(wallet?.totalProfit ?? 0, currency)}
          icon="💰"
        />
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <DetailCard
          title="Wallet performance"
          value={
            wallet
              ? `${wallet.profitPercentage > 0 ? "+" : ""}${
                  Math.round(wallet.profitPercentage * 100) / 100
                }%`
              : 0
          }
          icon="📈"
        />
        <DetailCard
          title="Wallet Value"
          value={formatMoney(wallet?.totalValue ?? 0, currency)}
          icon="💼"
        />
      </div>
    </div>
  );
};

export default DetailCardContainer;
