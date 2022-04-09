import './App.css';
import React, { useState, useEffect } from 'react';
// import API, Auth from Amplify library
import { API, Auth } from 'aws-amplify'
// import query definition
import { listPosts } from './graphql/queries';
// import Auth
import { withAuthenticator } from '@aws-amplify/ui-react'

function App() {

  const [posts, setPosts] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);

  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log({ err })
    }
  }

  async function checkUser() {
    const user = await Auth.currentAuthenticatedUser();
    setCurrentUser(user.username);
    console.log('user: ', user);
    console.log('user attributes: ', user.attributes);
  }

  return (
    <div>
      <h1>Amplyfoto</h1>
      Hello, {currentUser} !
      {
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.name}</h3>
            <p>{post.location}</p>
          </div>
        ))
      }
    </div>
  )
};

export default withAuthenticator(App);
