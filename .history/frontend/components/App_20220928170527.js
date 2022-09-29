import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import { axiosWithAuth } from '../axios'
import PrivateRoute from './PrivateRoute'
import axios from 'axios'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'
const initialFormValues = { title: '', text: '', topic: ''}
const initialFormUser = {
  username: '',
  password: '',
}

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [values, setValues] = useState(initialFormValues)
  const [user, setUser] = useState(initialFormUser)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { /* ✨ implement */ }
  const redirectToArticles = () => { /* ✨ implement */ }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    localStorage.clear()
    setMessage('Goodbye!')
    navigate('/')
    
  }

  const login = (info) => {
    
    
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    axios.post('http://localhost:9000/api/login', info)
    .then(res => localStorage.setItem("token", res.data.token), navigate('articles'))
    .catch(err => console.error(err))
    setMessage(`Here are your articles, ${user.username}`)
  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    axiosWithAuth().get('http://localhost:9000/api/articles')
    .then(res => 
             setArticles(res.data.articles)      
    )
    .catch(err => console.error(err))
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
    
  }

  const deleteArticle = article_id => {
    // ✨ implement
    axiosWithAuth().delete(`http://localhost:9000/api/articles/${article_id}`)
    .then(()=> getArticles())
    setMessage(`Article ${article_id} was delected, ${user.username}`)
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner />
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} user={user} setUser={setUser}/>} />
          <Route element ={<PrivateRoute />}>
             <Route path="articles"  element ={
               <>
                 <ArticleForm values={values} setValues={setValues} getArticles={getArticles} isEditing={isEditing} setIsEditing={setIsEditing} user={user} setMessage={setMessage}/>
                 <Articles values={values} setValues={setValues} getArticles={getArticles} articles={articles} setIsEditing={setIsEditing} deleteArticle={deleteArticle} isEditing={isEditing} setMessage={setMessage}  />
               </>}/>
          </Route>
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
