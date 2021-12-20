export interface Comment {
  commentValue: string;
  setCommentValue: (value: string) => void;
}

export interface Point {
  pointValue: number;
  setPointValue: (value: number) => void
}

export interface Comments {
  points: number;
  comment: string
  author: string
}
