import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getEnquiries,
  deleteEnquiries,
  resetState,
  updateEnquiries,
} from "../features/enquiry/enquirySlice";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);

  const enquiryState = useSelector((state) => state.enquiry.enquiry);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : "Submitted"
            }
            className="form-control form-select"
            id=""
            onChange={(e) => {
              setEnquiryStatus(e.target.value, enquiryState[i]._id);
            }}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-4"
            to={`/admin/enquiries/${enquiryState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 text-danger fs-4 bg-transparent border-0"
            onClick={() => showModal(enquiryState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateEnquiries(data));
  };
  const deleteEnq = (e) => {
    dispatch(deleteEnquiries(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteEnq(enqId)}
        title="Ary you Sure you want to delete this Enquiry ?"
      />
    </div>
  );
};
export default Enquiries;
