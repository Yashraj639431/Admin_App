import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";

import {
  getColors,
  deleteColors,
  resetState,
} from "../features/color/colorSlice";

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
    title: "Action",
    dataIndex: "action",
  },
];

const Colorlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const colorState = useSelector((state) => state.color.colors);

  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, [dispatch]);

  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: (
        <p
          style={{
            backgroundColor: colorState[i].title,
            width: "30px",
            height: "30px",
            borderRadius: "50px",
          }}
        >
          {" "}
        </p>
      ),
      action: (
        <>
          <Link to={`/admin/color/${colorState[i]._id}`} className="fs-4">
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-danger fs-4 bg-transparent border-0"
            onClick={() => showModal(colorState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }

  const deleteColor = (e) => {
    dispatch(deleteColors(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteColor(colorId)}
        title="Ary you Sure you want to delete this Color ?"
      />
    </div>
  );
};

export default Colorlist;
