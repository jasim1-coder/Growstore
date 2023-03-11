import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AlertBox = ({
  type,
  message,
  toDispatch,
  styles = "md:top-5 top-[78px] right-5",
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  const handleClose = () => {
    if (toDispatch) dispatch(toDispatch());
    setShow(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (toDispatch) dispatch(toDispatch());
      setShow(false);
    }, 5000);
  }, [toDispatch, dispatch]);

  return (
    <>
      {show && (
        <div
          className={`z-50 fixed md:w-[300px] md:h-[50px] h-[40px] w-[210px] alertbox ${type} ${styles} `}
        >
          <div className="px-4 flex flex-row justify-between items-center w-full">
            <span>{message}</span>
            <span className="alertbox-close-btn" onClick={handleClose}>
              &times;
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertBox;
