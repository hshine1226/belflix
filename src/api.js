import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "81ae146449b630b44d8761021ecff41e",
    language: "ko-KR",
  },
});

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/movie", {
      params: {
        // 사용자가 공백이나 특수문자를 입력할 수도 있으니 encoding 해주어야 한다.
        // BUT!!!! 기본적으로 axios에서 encoding을 해준다... 따로 encodeURIComponent 사용할 필요 없다.
        query: term,
      },
    }),
  videos: (id) =>
    api.get(`movie/${id}/videos`, {
      params: {
        language: "un-US",
      },
    }),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (term) =>
    api.get("search/tv", {
      params: {
        //   사용자가 공백이나 특수문자를 입력할 수도 있으니 encoding 해주어야 한다.
        query: term,
      },
    }),
  videos: (id) =>
    api.get(`tv/${id}/videos`, {
      params: {
        language: "un-US",
      },
    }),
};

//25EA%25B0%2580
