import React, { useEffect, useState } from 'react'
import PT from 'prop-types'
import { axiosWithAuth } from '../axios'


export default function ArticleForm(props) {
  
  
  // ✨ where are my props? Destructure them here
  
  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
  
  }, [])

  const onChange = evt => {
    const { id, value } = evt.target
    props.setValues({ ...props.values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
    axiosWithAuth().post('http://localhost:9000/api/articles', props.values)
    .then(()=> props.getArticles())
  }

  const onEditSubmit = evt => {
    evt.preventDefault()
    axiosWithAuth().put(`http://localhost:9000/api/articles/${props.values.article_id}`).then(()=> props.getArticles)
  }

  const isDisabled = () => {
    // ✨ implement
    // Make sure the inputs have some values
    if(props.values.title.length > 0 && props.values.text.length > 0 && props.values.topic.length > 0){
      return false
    }
    else{
      return true
    }
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>{props.isEditing ? "Edit Article" :"Create Article" }</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={props.values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={props.values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={props.values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      {props.isEditing ? <div className="button-group">
        <button disabled={isDisabled()} onClick={onEditSubmit}>Submit</button>
        <button onClick={Function.prototype}>Cancel edit</button>
      </div>:
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
      </div>}
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
