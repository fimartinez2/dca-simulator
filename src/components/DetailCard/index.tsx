interface Props {
  title: string;
  value: string | number;
  icon: string;
}

const DetailCard = (props: Props) => {
  const { title, value, icon } = props;
  return (
    <div className="h-24 w-44 min-w-fit rounded-lg border-2 p-2 flex flex-col ">
      <p className="text-xs">{title}</p>
      <p className="text-lg flex-grow w-full justify-end flex items-end">
        {value}
      </p>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
  );
};

export default DetailCard;
