import * as React from "react";

export default class Suggest extends React.Component {
  constructor(props) {
    super(props)
    this.openUrl = this.openUrl.bind(this);
  }

  openUrl() {
    const sgt = this.props.suggest
    // タブならアクティブにする
    if(sgt.hasOwnProperty("active")) {
      chrome.tabs.update(sgt.id, { active: true }, tab => {
        // 異なるwindowのタブならpopupを非表示する
        chrome.extension.getViews({type: "popup"}).forEach((win) => {
          if(win === window) win.close();
        });
        chrome.windows.update(tab.windowId, { focused: true })
      })
    } else {
      // タブ以外なら新しいタブで開く
      this.openNewTab(sgt.url)
    }
  }

  openNewTab(url) {
    chrome.tabs.create({ url: url })
  }

  render() {
    const suggest = this.props.suggest
    return (
      <div className="suggest" onClick={this.openUrl}>
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
