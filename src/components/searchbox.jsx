import * as React from "react";

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.handleQueryChange = this.handleQueryChange.bind(this)
  }

  handleQueryChange(e) {
    this.props.onQueryChange(e.target.value)
  }

  render() {
    return (
      <input
        type="text"
        id="searchbox"
        autoFocus
        placeholder="search..."
        value={this.props.query}
        onChange={this.handleQueryChange}
      />
    )
  }
}
