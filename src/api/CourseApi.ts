import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { ReviewType } from 'type';
import type * as Api from './common';

interface requestApiOptions {
  readonly course: AxiosInstance;
  readonly recommendCourse: () => AxiosPromise<Api.detailResponse[]>;
  readonly getCourse: () => AxiosPromise<Api.courseList>;
  readonly searchCourse: (search: string) => AxiosPromise<Api.courseList>;
  readonly getDetailInformation: (id: string | undefined) => AxiosPromise<Api.detailResponse>;
  readonly getReview: (id: string) => AxiosPromise<Api.reviewReponse>;
  readonly getUserReview: () => AxiosPromise<ReviewType[]>;
  readonly getReviewOrdering: (id: string, ordering: string) => AxiosPromise<Api.reviewReponse>;
  postReview: (id: string, reviewData: Api.reviewRequest) => AxiosPromise<Api.review>;
  putReview: (id: string, reviewData: Api.reviewRequest) => AxiosPromise<Api.review>;
  readonly deleteReview: (id: string) => AxiosPromise<void>;
  readonly getExercise: (id: string) => AxiosPromise<Api.exercise>;
  readonly getBookmark: () => AxiosPromise<Api.bookmark[]>;
  postBookmark: (id: string) => AxiosPromise<Api.review>;
  deleteBookmark: (id: string) => AxiosPromise<void>;
}

export const CourseApi = (): requestApiOptions => {
  const course = axios.create({
    baseURL: '/api/course',
  });
  return {
    course,
    getCourse: () => course.get(`/list`),
    recommendCourse: () => course.get(`/recommend`),
    searchCourse: (search) =>
      course.get(`/list`, {
        params: { search: search },
      }),
    getDetailInformation: (id) => axios.get(`/course/${id}`),
    getReview: (id) => course.get(`/${id}/review`),
    getUserReview: () => course.get(`/review/collection`),
    getReviewOrdering: (id, ordering) =>
      course.get(`/${id}/review`, {
        params: { ordering: ordering },
      }),
    postReview: (id, reviewData) =>
      course.post(`/${id}/review`, {
        content: reviewData.content,
        rating: reviewData.rating,
        course_id: reviewData.course_id,
      }),
    putReview: (id, reviewData) =>
      course.put(`/review/${id}`, {
        content: reviewData.content,
        rating: reviewData.rating,
      }),
    deleteReview: (id) => course.delete(`/review/${id}`),
    getExercise: (id) => course.get(`/exercise/${id}`),
    getBookmark: () => course.get(`/bookmark`),
    postBookmark: (id) =>
      course.post(`/bookmark`, {
        course_id: id,
      }),
    deleteBookmark: (id) => course.delete(`/${id}/bookmark`),
  };
};
