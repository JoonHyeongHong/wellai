import { Rating } from '../course/Comment';
import styled from 'styled-components';
import { FiDelete } from 'react-icons/fi';
import { CourseApi } from 'api/CourseApi';
import React from 'react';
export type ReviewProps = {
  id: string;
  user_id: string;
  created_at: string;
  modified_at: string;
  content: string;
  rating: number;
  course_id: {
    id: string;
    course_name: string;
  };
};

export type EditReviewProps = {
  onRemove: (id: string) => void;
};

const Review: React.FunctionComponent<ReviewProps & EditReviewProps> = ({
  course_id,
  id,
  rating,
  content,
  onRemove,
}) => {
  const removeReview = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const course = CourseApi();
    course
      .deleteReview(id)
      .then(() => onRemove(id))
      .catch((err) => console.log(err.response));
  };
  return (
    <Div>
      <div className="close">
        <button onClick={removeReview}>
          <FiDelete size="1.5em" />
        </button>
      </div>

      <div>
        <Rating value={rating} disabled />
      </div>
      <div className="comment">
        <b>{course_id.course_name}</b>
        {content}
      </div>
    </Div>
  );
};

export default Review;

const Div = styled.div`
  width: 100%;
  padding: 2%;
  border-bottom: 1px solid ${(props) => props.theme.border};
  position: relative;
  b {
    color: ${(props) => props.theme.main};
    font-size: 1.5em;
    margin-right: 1em;
  }

  .comment {
    margin-top: 1em;
  }

  .close {
    position: absolute;
    right: 3%;
  }
`;
