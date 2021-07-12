import React, { useEffect, useState } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from '../../Axios';
const Delete = ({ history }) => {
    let [removePost, setRemovePost] = useState('');
    let { id } = useParams();
    
    useEffect(() => {
        let fetchData = async() => {
            let data = await Axios.get(`/api/posts/post/${id}`);
            let deleteData = data.data;
            setRemovePost(deleteData);
        };
        fetchData();
    },[id]);
    
    //fot to delete individual post
    let deletPost = async e => {
        await Axios.delete(`/api/posts/delete-post/${id}`);
        toast.warning("Post Deleted...");
        history.push('/');
    }

    let {title, details} = removePost;

    return (
        <section className="container my-2">
        <article className="jumbotron align-items-center">
          <h2 className="text-success font-weight-bold text-uppercase text-center">
            {title}
          </h2>
          <p className="card-title my-4">{details}</p>
          <hr className="hr my-2" />
          <Link to="/" className="btn btn-secondary">
            go back
          </Link>
          <button to="/" className="btn btn-danger float-right" onClick={ deletPost }>
            Delete
          </button>
        </article>
      </section>
    )
}

export default withRouter(Delete);
