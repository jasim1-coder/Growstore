import React, { useState } from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrainingError,
  getTrainingStatus,
  getTrainingSummary,
  trainCFModel,
} from "../../redux/slice/daiSlice";
import SimpleLoading from "../../components/common/loaders/SimpleLoading";
import { useEffect } from "react";
import { PRIVATE_PYTHON_API } from "../../api/apiIndex";
import moment from "moment/moment";

const TrainModel = () => {
  const dispatch = useDispatch();
  const status = useSelector(getTrainingStatus);
  const error = useSelector(getTrainingError);
  const summary = useSelector(getTrainingSummary);

  const [epoch, setEpoch] = useState(5);
  const [lastModified, setLastModified] = useState(null);

  const handleModelTrain = (e) => {
    e.preventDefault();
    if (!isNaN(epoch) && epoch > 0) {
      dispatch(trainCFModel({ epoch }));
    }
  };

  useEffect(() => {
    const getLastTrainDate = async () => {
      const { data } = await PRIVATE_PYTHON_API.get("/train");
      setLastModified(moment(data.data * 1000).format("DD MMM, YYYY HH:mm"));
    };
    getLastTrainDate();
  }, []);

  return (
    <AdminLayout>
      <div className="adminContainer">
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center">
          <AdminPageHeader title="Train Model" />
        </div>

        <section className="adminMainContainer gap-4">
          <div className="flex flex-col w-full gap-2">
            <div className="flex sm:flex-row flex-col gap-3 sm:justify-between w-full">
              <h4 className="heading4">Recommendation System Model Train</h4>
              <p className="text-sm text-textDim">
                Last Trained:{" "}
                <span className="text-base text-baseGreen font-medium">
                  {lastModified}
                </span>
              </p>
            </div>
            <span className="text-sm text-textDim">
              The collaborative filtering neural network model will be trained
              for given <b>Epoch </b>
              with new ratings data from the database and saved in the server.
              This process will take some time to complete.
            </span>
            {status === "loading" ? (
              <p className="font-bold">Model is being trained. Please wait</p>
            ) : null}
            {status === "failed" ? (
              <p className="text-uiRed font-medium">
                Model training failed. Error: {error}
              </p>
            ) : null}
          </div>
          <form
            onSubmit={handleModelTrain}
            className="flex flex-col gap-3 relative"
          >
            {status === "loading" ? <SimpleLoading /> : null}
            <div className="input-container">
              <div className="flex flex-col">
                <label className="input-label" htmlFor="epoch">
                  Epoch{" "}
                </label>
                <span className="text-textDim text-xs">
                  Estimated time: {epoch * 20} min
                </span>
              </div>
              <input
                id="epoch"
                name="epoch"
                type="number"
                value={epoch}
                onChange={(e) => setEpoch(e.target.value)}
                className="input-box h-[40px]"
                min={1}
                required
              />
            </div>
            <button
              className="primary-button disabled:bg-uiGrey"
              type="submit"
              disabled={status === "loading"}
            >
              Train
            </button>
          </form>
          {summary ? (
            <div className="flex flex-col border border-greyLight">
              <p className="font-semibold text-baseGreen text-[20px] py-2 px-4">
                Model Trained Successfully
              </p>
              <div className="border-t border-t-greyLight">
                <div className="py-2 px-4">
                  <p className="text-textDim text-sm leading-7">
                    Root Mean Squared Error (RMSE):{" "}
                    <span className="font-medium text-uiBlack text-base">
                      {parseFloat(summary?.RMSE).toFixed(4)}
                    </span>
                  </p>
                  <p className="text-textDim text-sm leading-7">
                    Mean Squared Error (MSE):{" "}
                    <span className="font-medium text-uiBlack text-base">
                      {parseFloat(summary?.MSE).toFixed(4)}
                    </span>
                  </p>
                  <p className="text-textDim text-sm leading-7">
                    Mean Absolute Error (MAE):{" "}
                    <span className="font-medium text-uiBlack text-base">
                      {parseFloat(summary?.MAE).toFixed(4)}
                    </span>
                  </p>
                  <p className="text-textDim text-sm leading-7">
                    Accuracy:{" "}
                    <span className="font-medium text-uiBlack text-base">
                      {parseFloat(summary?.accuracy * 100).toFixed(2)}%
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </AdminLayout>
  );
};

export default TrainModel;
