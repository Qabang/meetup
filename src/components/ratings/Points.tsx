import { Rating } from 'react-simple-star-rating'
import { Point as PointModel } from "../../models/Ratings"

interface Props extends PointModel {
  readOnly: boolean
}

function Points({ readOnly, pointValue, setPointValue }: Props) {
  function handleRating(value: number) {
    setPointValue(value)
  }
  return <>
    <Rating onClick={(value) => handleRating(value)} ratingValue={pointValue} readonly={readOnly} className="rating" />
  </>
}

export default Points
