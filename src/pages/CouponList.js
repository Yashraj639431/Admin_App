import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import {
  getCoupons,
  deleteCoupons,
  resetState,
} from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.expiry.length - b.expiry.length,
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, [dispatch]);
  
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link to={`/admin/coupon/${couponState[i]._id}`} className="fs-4">
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-danger fs-4 bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCoupon = (e) => {
    dispatch(deleteCoupons(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteCoupon(couponId)}
        title="Ary you Sure you want to delete this Coupon ?"
      />
    </div>
  );
};

export default CouponList;
