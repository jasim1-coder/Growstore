import React from "react";
import ProfileLayout from "../../components/profile/ProfileLayout";
import { Link, useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import OrderActions from "../../components/profile/orders/OrderActions";
import OrderSummary from "../../components/profile/orders/OrderSummary";
import AddressSummary from "../../components/profile/orders/AddressSummary";
import OrderProducts from "../../components/profile/orders/OrderProducts";
import { colorCodes } from "../../utils/DefaultValues";

const ManageOrder = () => {
  const id = useParams().id;

  return (
    <ProfileLayout>
      <section className="p-4 flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link
            to="/profile/orders"
            className="flex flex-row items-center gap-2 text-uiBlack"
          >
            <FiChevronLeft />
            <span className="">Back</span>
          </Link>
          <h2 className="heading2">Manage Order</h2>
        </div>
        <div className="flex flex-col gap-3">
          <div className="py-2 border-b border-b-greyLight">
            <h3 className="heading4">Order Status</h3>
          </div>

          <div className="w-max">
            <div
              className={`py-1 px-4 border ${colorCodes["Processing"]} rounded-sm`}
            >
              <span className={`font-medium `}>Processing</span>
            </div>
          </div>
        </div>
        <OrderSummary />
        <OrderProducts />
        <AddressSummary />
        <OrderActions />
      </section>
    </ProfileLayout>
  );
};

export default ManageOrder;
