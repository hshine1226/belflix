import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);

    const {
      location: { pathname },
    } = props;

    this.state = {
      result: null,
      loading: true,
      error: null,
      isMovie: pathname.includes("/movie/"),
      videos: null,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;

    const { isMovie } = this.state;

    // resource를 string에 낭비하지 않게 하기 위해서 id가 number인지 확인하자!
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      return push("/");
    }

    let result = null;
    let videos = null;
    try {
      if (isMovie) {
        // let 변수에 desctucturing 하는 방법
        // 괄호로 감싸준다!! COOL
        ({ data: result } = await moviesApi.movieDetail(parsedId));
        ({
          data: { results: videos },
        } = await moviesApi.videos(parsedId));
        console.log(videos);
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        ({
          data: { results: videos },
        } = await tvApi.videos(parsedId));

        console.log(videos);
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: "결과를 찾을 수 없습니다." });
    } finally {
      this.setState({ loading: false, result, videos });
    }
  }

  render() {
    const { result, videos, loading, error } = this.state;
    console.log(result);
    return (
      <DetailPresenter
        result={result}
        loading={loading}
        error={error}
        videos={videos}
      />
    );
  }
}
