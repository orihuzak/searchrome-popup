import * as React from "react"
import * as ReactDOM from "react-dom"

type State = {
  query: string
}

class SearchView extends React.Component<{}, State> {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    };
    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  handleQueryChange(query) {
    this.setState({
      query: query
    })
  }

  render() {
    return (
      <div>
        <SearchBox
          query={this.state.query}
          onQueryChange={this.handleQueryChange}
        />
        <h1>{this.state.query}</h1>
      </div>
    )
  }
}

type searchBoxProps = {
  query: string;
  onQueryChange: Function
}

class SearchBox extends React.Component<searchBoxProps, {}> {
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
        placeholder="search..."
        value={this.props.query}
        onChange={this.handleQueryChange}
      />
    )
  }
}

ReactDOM.render(
  <SearchView />,
  document.getElementById('root')
);