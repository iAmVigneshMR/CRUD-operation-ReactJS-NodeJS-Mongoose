import React, { useEffect, useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import Axios from '../Axios';
import faker from 'faker/locale/en_IND';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
// for loader
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const Home = props => {
    const [ posts ,setPosts ] = useState([]);
    const [ loading ,setLoading ] = useState(true);
    const [ searchTerm, setSearchTerm ] = useState("");


    useEffect(() => {
        try {
            let fetchData =async () => {
            let postData = await Axios.get('/api/posts/all-posts');
            console.log(postData);
            console.log(postData.data.posts);
            setPosts(postData.data.posts);
            setLoading(false);
        }
        fetchData();
        } catch (error) {
            toast.error(error.message)
        }
    },[]);

    // adding data to a card

    let PostData = posts
    .filter(val => {                    //to search the post
      if (searchTerm === "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map(post => {
    return (
    <Fragment key = {post._id}>
        <div className="col-md-3">
            <img src={faker.image.avatar()} alt={post.title} className="card-img-top" />
            <div className="card-body">
                <h2 className="font-weight-bold pt-2 text-uppercase font-smaller" style={{fontSize:18}} >{ post.title.slice(0, 13) }</h2>
                <p className="font-weight-normal pt-2 text-lowercase font-smaller">{ post.details.slice(0, 50) }...</p>
                <p className="text-primary font-weight-bold text-capitalize"> <Moment fromNow>{ post.createdAt }</Moment></p>
            <hr className="hr" />
            <footer className="btn-group btn-block bg-secondary">
                <div className="icons btn btn-secondary btn-sm">
                    <Link to={ `/edit-post/${post._id}` }>
                    <i className="fas fa-pen"></i>
                    </Link>
                </div>
                <div className="icons btn btn-light btn-sm">
                    <Link to={ `/post-detail/${post._id}` }>
                    <i className="fas fa-eye"></i>
                    </Link>
                </div>
                <div className="icons btn btn-danger btn-sm">
                    <Link to={ `/delete-post/${post._id}` }>
                    <i className="fas fa-trash" aria-hidden="true"></i>
                    </Link>
                </div>
            </footer>
            </div>
        </div>
    </Fragment>
    )
})

    return (
        <div className="container my-2">
            <h1 className="h1 font-weight-bold text-success boder-bottom pb-2 pt-3 text-uppercase">Posts</h1>
            <hr className="hr" />
            <input
                type="search"
                className="form-control my-2 vw-75"
                placeholder="search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <hr className="hr" />
            {loading === true ? ( <ClipLoader loading={loading} size={150} /> )
            :
             (<div className="card container-fluid">
                 <div className="card-body">
                     <div className="row">{PostData}</div>
                 </div>
             </div>) }
        </div>
    )
}

export default Home
