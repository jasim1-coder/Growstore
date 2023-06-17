import React, { useEffect } from "react";
import Layout from "../components/common/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getUserVerifyError,
  getUserVerifyStatus,
  removeVerifyUserError,
  verifyUser,
} from "../redux/slice/authSlice";
import AlertBox from "../components/common/AlertBox";
import { ImSpinner2 } from "react-icons/im";

const VerifyEmail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(getUserVerifyStatus);
  const error = useSelector(getUserVerifyError);

  const handleSubmit = async () => {
    dispatch(verifyUser(token));
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  return (
    <Layout>
      {status === "failed" ? (
        <AlertBox
          type={status}
          message={error}
          toDispatch={removeVerifyUserError}
        />
      ) : null}

      <div className="flex justify-center items-center w-full sm:py-12 py-6">
        <div className="sm:w-[450px] w-[95%] p-7 bg-formBackground rounded-sm border border-greyLight">
          <div className="flex flex-col gap-6">
            <div className="">
              <h2 className="text-uiBlack text-[20px] font-semibold">
                Verify your Email
              </h2>
              <span className="text-textDim text-xs">
                Please click the button to verify your email
              </span>
            </div>
            <div className="pb-6 border-b border-uiGrey flex flex-col">
              <button
                type="button"
                onClick={handleSubmit}
                className="submit-button"
                disabled={status !== "idle"}
              >
                {status == "loading" ? (
                  <ImSpinner2 className="animate-spin" />
                ) : (
                  "Verify Email"
                )}
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-uiBlack text-[18px] font-semibold">
                Back to login?
              </p>
              <Link
                to="/login"
                className="font-medium text-center border border-uiGrey text-textDim w-full py-3 rounded-sm hover:bg-greyLight transition-all duration-150"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyEmail;
