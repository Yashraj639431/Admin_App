import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCategories,
  deleteProductCategories,
  resetState,
} from "../features/pCategory/pCategorySlice";
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
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategories());
  }, [dispatch]);

  const productCategoryState = useSelector(
    (state) => state.pCategory.pCategory
  );
  const data1 = [];
  for (let i = 0; i < productCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: productCategoryState[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${productCategoryState[i]._id}`}
            className="fs-4"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-danger fs-4 bg-transparent border-0"
            onClick={() => showModal(productCategoryState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCategory = (e) => {
    dispatch(deleteProductCategories(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteCategory(categoryId)}
        title="Ary you Sure you want to delete this Product Category ?"
      />
    </div>
  );
};

export default CategoryList;
