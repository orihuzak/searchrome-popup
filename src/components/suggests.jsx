import * as React from "react";
import Suggest from "./suggest"

export default class Suggests extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const suggests = []
    this.props.suggests.forEach( (suggest, i) => {
      suggests.push(<Suggest suggest={suggest} key={i} />)
    })
    return (
      <div className="suggests">{suggests}</div>
    )
  }
}
