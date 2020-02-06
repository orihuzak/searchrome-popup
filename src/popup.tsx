import * as React from "react"
import * as ReactDOM from "react-dom"

class SearchView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>こんにちは</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <SearchView />,
  document.getElementById('root')
);