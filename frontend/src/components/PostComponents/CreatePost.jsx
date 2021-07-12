import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from '../../Axios';

const CreatePost = ({ history }) => {
  // let  { history } = useHistory();
  let [ posts, setPosts ] = useState({
    title: "",
    details: "",
    loading: false,
  });

  let handleChange = e => {
      let { name, value } = e.target;
      setPosts({ ...posts, [name]: value });
    };

let { title, details, loading } = posts;

  let handleSubmit = async e => {
    e.preventDefault();
    try {
        let data = { title, details };
      setPosts({ loading: true });
      let postData = await Axios.post('/api/posts/add-post',data)
      history.push("/");
      console.log(postData);
      toast.success('successfully post created')
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setPosts({ loading: false, title: "", details: "" });
  };

  return (
    <section id="PostBlock" className="card container mx-auto col-md-5 my-4">
      <div className="card-body">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="enter title"
              value={title}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">details</label>
            <textarea
              name="details"
              id="details"
              cols="30"
              rows="10"
              value={details}
              onChange={handleChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-success btn-block">
              {loading === true ? "loading" : "create"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default withRouter(CreatePost);
