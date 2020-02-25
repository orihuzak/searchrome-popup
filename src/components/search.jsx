import * as React from "react";
import SearchBox from "./searchbox";
import Suggests from "./suggests"

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      suggests: []
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleQueryChange(query) {
    this.setState({
      query: query
    });
  }

  updateSuggests(suggests) {
    this.setState({
        suggests: suggests
      }
    )
  }

  componentDidMount() {
    this.showTabsHistory()
  }

  showTabsHistory() {
    // send message
    chrome.runtime.sendMessage({ tabsHistory: true }, (res) => {
      this.updateSuggests(res.tabsHistory)
    })
    // chrome.storage.local.get("tab", (result) => {
    //   this.updateSuggests(result.tab)
    // })
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
