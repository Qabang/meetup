import {Comments as CommentsModel} from './Ratings'

export interface Events {
  id: number
  name: string
  date: string
  time_start: string
  time_end: string
  description: string
  participants: number
  image?: string
  location: {
    city?: string
    adress?: string
    other?: string
  }
  comments: Array<CommentsModel>
}
