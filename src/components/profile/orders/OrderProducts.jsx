import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/FormatCurrency";

const OrderProducts = ({ data }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="py-2 border-b border-b-greyLight">
        <h3 className="heading4">Products Summary</h3>
      </div>

      <div className="grid-list-2">
        {data.map((entry, key) => (
          <div className="flex sm:flex-row flex-col sm:gap-8 gap-5" key={key}>
            <div className="h-[100px] w-[100px] flex-none">
              <img
                className="object-cover h-full w-full rounded-sm"
                src={entry.imageUrl}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <Link to={`/product/${entry.id}`}>
                <span
                  className="hover:text-uiOrange"
                  dangerouslySetInnerHTML={{ __html: entry.title }}
                />
              </Link>
              <div className="flex flex-col gap-1 pt-2">
                <span className="text-baseGreen font-semibold">
                  {formatCurrency(entry.price)}
                </span>
                <span className="text-sm">Qty: {entry.quantity}</span>
                <p className="">
                  <span className="text-sm">Amount: </span>
                  <span className="text-sm text-baseGreen">
                    {formatCurrency(entry.subTotal)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProducts;
