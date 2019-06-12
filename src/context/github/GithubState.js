import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SET_LOADING,
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS
} from "../types";

let githubClientId;
let gitubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  gitubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  gitubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

// <----------------------------Create initial State ----------------------->

// Github state is the function, we are passing the props
const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  // Communicating to reducer function

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //1. Search USers

  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client-id=${githubClientId}&client-secret=${gitubClientSecret}`
    );

    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  //2.Get  USer

  const getUser = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client-id=${githubClientId}&client-secret=${gitubClientSecret}`
    );

    dispatch({ type: GET_USER, payload: res.data });
  };

  //3.Get Repos
  const getUserRepos = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client-id=${githubClientId}&client-secret=${gitubClientSecret}`
    );

    // this.setState({
    //   repos: res.data,
    //   loading: false
    // });
    dispatch({ type: GET_REPOS, payload: res.data });
    // setrepos(res.data);
  };

  //4.Clear USers

  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  //5. Set SET_LOADING
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    // Value is the prop that we send to the consumer. Include all the state and reducers
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
