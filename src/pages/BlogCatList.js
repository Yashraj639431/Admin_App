import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteBlogCategories,
  resetState,
} from "../features/bCategory/bCategorySlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo.",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogCatList = () => {
  const [open, setOpen] = useState(false);
  const [bcategoryId, setbcategoryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setbcategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);

  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const data1 = [];
  for (let i = 0; i < bCatState.length; i++) {
    data1.push({
      key: i + 1,
      title: bCatState[i].title,
      action: (
        <>
          <Link to={`/admin/blog-category/${bCatState[i]._id}`} className="fs-4">
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-danger fs-4 bg-transparent border-0"
            onClick={() => showModal(bCatState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }

  const deletebCategory = (e) => {
    dispatch(deleteBlogCategories(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deletebCategory(bcategoryId)}
        title="Ary you Sure you want to delete this Blog Category ?"
      />
    </div>
  );
};

export default BlogCatList;
