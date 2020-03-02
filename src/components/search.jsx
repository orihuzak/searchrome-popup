import * as React from "react";
import SearchBox from "./searchbox";
import Suggests from "./suggests"

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.timeoutID
    this.state = {
      query: "",
      suggests: []
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleQueryChange(query) {
    clearTimeout(this.timeoutID)
    this.setState({
      query: query
    });
    this.timeoutID = setTimeout(this.search.bind(this), 300) // 0.3sディレイをつける
  }

  updateSuggests(suggests) {
    this.setState({
        suggests: suggests
      }
    )
  }

  componentDidMount() {
    this.search()
  }

  search() {
    chrome.runtime.sendMessage({ query: this.state.query }, res => {
      this.updateSuggests(res.suggests)
    })
  }

  render() {
    return (
      <div>
        <SearchBox
          query={this.state.query}
          onQueryChange={this.handleQueryChange}
        />
        <Suggests suggests={this.state.suggests} />
      </div>
    )
  }
}
