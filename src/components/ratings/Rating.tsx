import { useContext, useEffect, useRef, useState } from 'react'
import Comment from './Comment'
import Points from './Points'
import { Comments as CommentsModel } from '../../models/Ratings'
import LoginContext from '../../contexts/LoginContext'
import { useParams } from 'react-router-dom'
import './style.scss'


function Rating(props: { comments: Array<CommentsModel> }) {
  const [commentText, setCommentText] = useState('')
  const [point, setPoint] = useState(0)
  const [error, setError] = useState('')
  const activeUser = useContext(LoginContext)
  const { id } = useParams()
  const [currentComments, setCurrentComments] = useState(props.comments)


  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'auto'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  }


  function handleSubmitComment() {
    if (commentText === '') {
      return setError('You have to write a comment')
    }

    // Clear error msg.
    setError('')

    let data = {
      comment: commentText,
      points: point,
      author: activeUser.username,
    }

    // Get stored events and alter the data.
    const local_storage_events = localStorage.getItem('events')
    if (local_storage_events !== null && local_storage_events !== undefined) {
      let tmp_events = JSON.parse(local_storage_events || '[]')
      let obj_index = tmp_events.findIndex(
        (item: any) => item.id.toString() === id
      )

      if (obj_index !== -1) {
        tmp_events[obj_index].comments.push(data)
        localStorage.setItem('events', JSON.stringify(tmp_events))
        setCurrentComments(tmp_events[obj_index].comments)
        scrollToBottom()
      }
    }
  }

  return (
    <section className='rating-wrapper'>
      <Points pointValue={point} setPointValue={setPoint} readOnly={false} />
      <Comment commentValue={commentText} setCommentValue={setCommentText} />
      <button className="submit-btn" type='submit' data-test="submit-rating" onClick={handleSubmitComment}>
        Submit Comment
      </button>
      {error && <div data-test="error-msg" className="error-msg">{error}</div>}
      <section data-test="comments-wrapper" className="comments-array-wrapper">
        {currentComments &&
          currentComments.map((item: CommentsModel, i) => (
            <section className="comments-wrapper" key={i}>
              <Points pointValue={item.points} setPointValue={setPoint} readOnly={true} />
              <div className="comment">{item.comment}</div>
              <div className="author">{item.author}</div>
            </section>
          ))}
        {currentComments.length < 1 && <div className="no-comments">Be the first to rate this event!</div>}
      </section>
    </section>
  )
}

export default Rating
