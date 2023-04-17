import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserItem = ({ data }) => {
  const navigate = useNavigate();
  const date = moment(data.createdAt).format("DD MMM YY, HH:MM");

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
    </tr>
  );
};

export default UserItem;
