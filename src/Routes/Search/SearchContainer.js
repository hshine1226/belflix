import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false,
  };

  handleSubmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);

      this.setState({ movieResults, tvResults });
    } catch {
      this.setState({ error: "결과를 찾을 수 없습니다." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { error, loading, movieResults, tvResults, searchTrem } = this.state;
    console.log(this.state);
    return (
      <SearchPresenter
        error={error}
        loading={loading}
        movieResults={movieResults}
        tvResults={tvResults}
        searchTrem={searchTrem}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
