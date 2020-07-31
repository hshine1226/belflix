import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTrem: "",
    error: null,
    loading: false,
  };

  render() {
    const { error, loading, movieResults, tvResults, searchTrem } = this.state;
    return (
      <SearchPresenter
        error={error}
        loading={loading}
        movieResults={movieResults}
        tvResults={tvResults}
        searchTrem={searchTrem}
      />
    );
  }
}
