import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    // console.log("cdm")
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f0fe2da4e36049918676b467b5c2a966&page=1&pageSize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading : false
    });
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f0fe2da4e36049918676b467b5c2a966&page=${this.state.page - 1
      }&pagesize=${this.props.pagesize}`;
      this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading : false
    });
  };
  handleNextClick = async () => {
    if (
      !(this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pagesize))
    ){
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f0fe2da4e36049918676b467b5c2a966&page=${this.state.page + 1
        }&pagesize=${this.props.pagesize}`;
        this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading : false
    });
  }
};
render() {
  return (
    <div className="container my-3 mb-4">
      <h1 className="text-center">NewsWala - Top Headlines</h1>
      {this.state.loading && <Spinner />}

      <div className="row">
        {this.state.articles.map((element) => {
          return (
            <div className="col md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title : ""}
                description={element.description ? element.description : ""}
                imageUrl={
                  element.urlToImage
                    ? element.urlToImage
                    : "https://supercarblondie.com/wp-content/uploads/galaxy-s23-ultra-bmw-m-edition-1.jpg"
                }
                newsUrl={element.url}
              />
            </div>
          );
        })}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={this.state.page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={this.handlePrevClick}
        >
          &larr;Previous
        </button>
        <button
          type="button"
          disabled={
            this.state.page + 1 >
            Math.ceil(this.state.totalResults / this.props.pagesize)
          }
          className="btn btn-dark"
          onClick={this.handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
}

export default News;
