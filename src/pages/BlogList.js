import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, deleteBlogs, resetState } from "../features/blog/blogSlice";
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
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [dispatch]);

  const blogState = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogState[i].title,
      category: blogState[i].category,
      action: (
        <>
          <Link to={`/admin/blog/${blogState[i]._id}`} className="fs-4">
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-danger fs-4 bg-transparent border-0"
            onClick={() => showModal(blogState[i]._id)}
          >
            <AiOutlineDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBlog = (e) => {
    dispatch(deleteBlogs(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteBlog(blogId)}
        title="Ary you Sure you want to delete this Blog ?"
      />
    </div>
  );
};

export default BlogList;