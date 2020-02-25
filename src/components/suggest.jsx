import * as React from "react";

export default class Suggest extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const suggest = this.props.suggest
    return (
      <div className="suggest">
        <div className="icon-wrapper">
          <img src="" alt="" className="icon"/>
        </div>
        <div>
          <div className="title">{suggest.title}</div>
          <div className="url">{suggest.url}</div>
        </div>
      </div>
    )
  }
}