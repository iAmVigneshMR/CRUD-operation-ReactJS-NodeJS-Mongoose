import React, { useEffect, useState } from "react";
import { Link, useParams, withRouter } from "react-router-dom";
import faker from "faker/locale/en_IND";
import Axios from '../../Axios';

const PostDetails = () => {
let [ post, setPosts] = useState("");

  //to get the stored data and to display in text fiel
  let { id } = useParams();
  // console.log(useParams);
  useEffect(() => {
    let fetchData = async () => {
      let data = await Axios.get(`/api/posts/post/${id}`);
    //   console.log(data.data);
      let payload = data.data;
    //   console.log(payload);
      setPosts(payload);
    };
    fetchData();
  }, [id]);

//   console.log(post);
  let {title, details} = post;

    return (
        <section className="container my-2">
      <article className="jumbotron align-items-center">
        <figure className="text-center">
          <img
            src={faker.image.avatar()}
            alt={title}
            className="rounded-circle text-center"
          />
        </figure>
        <h2 className="text-success font-weight-bold text-uppercase text-center">
          {title}
        </h2>
        <p className="card-title my-4">{details}</p>
        <Link to="/" className="btn btn-secondary">
          go back
        </Link>
      </article>
    </section>
    )
}

export default PostDetails
