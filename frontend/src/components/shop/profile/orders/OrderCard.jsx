import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";
import { colorCodes } from "../../../../utils/DefaultValues";
import { formatCurrency } from "../../../../utils/FormatCurrency";

const OrderCard = ({ data }) => {
  console.log("Order Data:",data);
  const date = moment(data.date).format("DD MMM YYYY, HH:mm");
  return (
    <div className="flex flex-col p-4 border border-greyLight rounded-sm">
      <div className="flex flex-row gap-4 justify-between border-b-greyLight pb-2 border-b ">
        <div className="flex flex-col gap-1">
          <h4 className="heading4 text-base">{data.orderId}</h4>
          <span className="text-sm text-textDim">{date}</span>
        </div>

        <div className="">
          <div className={`rounded-sm ${colorCodes[data.status]}`}>
            <span className="font-medium italic">{data.status}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b border-b-greyLight pb-2 pt-2">
        {data?.items?.map((entry, key) => (
          <div className="flex flex-row gap-4 items-center" key={key}>
            <div className="h-[80px] w-[80px]">
              <img
                src={entry.image || ""}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span
                className="text-sm text-bodyText"
                dangerouslySetInnerHTML={{
                  __html:
                    entry.name.length > 50
                      ? entry.name.substring(0, 50) + "..."
                      : entry.name,
                }}
              />
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-sm">{formatCurrency(entry.price)}</span>
                <span className="text-sm text-bodyText">
                  Qty: {entry.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-between items-center w-full gap-4 pt-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-textDim">{data.items.totalItems} items</span>
          <span className="font-medium">
            {formatCurrency(data.amount)}
          </span>
        </div>

        <Link to={`/profile/orders/${data.id}`} className="">
          <button className="py-1 px-4 border border-baseGreen text-baseGreen text-sm">
            Manage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
