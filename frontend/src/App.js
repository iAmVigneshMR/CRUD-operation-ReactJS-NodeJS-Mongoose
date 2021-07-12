import React, { Fragment } from 'react';
import Navbar from './components/NavbarComponents/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './components/PostComponents/CreatePost';
import PageNotFound from './pages/PageNotFound';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import PostDetails from './components/PostComponents/PostDetails';
import EditPost from './components/PostComponents/EditPost';
import Delete from './components/PostComponents/Delete';

const App = () => {
    return (
        <Fragment>
            <Router>
                <header>
                    <Navbar />
                </header>
                <ToastContainer />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/create-post" exact>
                        <CreatePost />
                    </Route>
                    <Route path="/post-detail/:id" exact>
                        <PostDetails />
                    </Route>
                    <Route path="/edit-post/:id" exact>
                        <EditPost />
                    </Route>
                    <Route path="/delete-post/:id" exact>
                        <Delete />
                    </Route>
                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            </Router>
        </Fragment>
    )
}

export default App
