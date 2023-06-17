import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserItem = ({ data }) => {
  const navigate = useNavigate();
  const date = moment(data.createdAt).format("DD MMM YY, HH:mm");

  const handleUserNavigation = () => {
    navigate(`/admin/users/${data._id}`);
  };

  return (
    <tr
      className="border-b hover:bg-uiBlue/10 cursor-pointer text-sm text-bodyText"
      onClick={handleUserNavigation}
    >
      <td className="px-2 py-4 overflow-clip">
        <span>{data.name}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{data.email}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{data.mobileNumber}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{date}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        {data.active ? (
          <span className="py-1 px-4 bg-green-200 text-green-600 rounded-[30px] text-sm">
            Active
          </span>
        ) : (
          <span className="py-1 px-4 bg-red-200 text-red-600 rounded-[30px] text-sm">
            Deactive
          </span>
        )}
      </td>
    </tr>
  );
};

export default UserItem;
