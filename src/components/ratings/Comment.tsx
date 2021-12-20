import { Comment as CommentModel} from "../../models/Ratings"

function Comment({ commentValue, setCommentValue }: CommentModel) {
  return <>
    <textarea name="comment"
        placeholder="Leave a comment"
        data-test="comment-field"
        rows={6}
        value={commentValue}
        onChange={(event) => setCommentValue(event.target.value)}
      />
  </>
}

export default Comment
