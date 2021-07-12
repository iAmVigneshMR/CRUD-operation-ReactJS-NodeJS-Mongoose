import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from '../../Axios';

const EditPost = ({ history }) => {
  // console.log(history);
  // let  { history } = useHistory();
  let [ posts, setPosts ] = useState({
    title: "",
    details: "",
    loading: false,
  });

  //to get the stored data and to display in text fiel
  let { id } = useParams();
  // console.log(useParams);
  useEffect(() => {
    let fetchData = async () => {
      let data = await Axios.get(`/api/posts/post/${id}`);
      // console.log(data.data);
      let existingData = data.data;
      setPosts(existingData);
    };
    fetchData();
  }, [id]);

  let handleChange = e => {
      let { name, value } = e.target;
      setPosts({ ...posts, [name]: value });
    };
    let { title, details, loading } = posts;
    

    //for editing post
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      let data = { title, details };
      setPosts({ loading: true });
      let postData = await Axios.put(`/api/posts/edit-post/${id}`,data)
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
        <h2>Update Post</h2>
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
            <label htmlFor="details">Details</label>
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
              {loading === true ? "loading..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default withRouter(EditPost);
