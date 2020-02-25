import Fuse from 'fuse.js'
import { treeToFlatList, mergeAndDeduplicate } from './utilities'

const log = console.log

let items = []
let currentTab
let tabs = []
let history = []
let bookmarks = []
let tabsHistory = []
let fuse

/** fuse option */
const FUSE_OPTION = {
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 1,
  threshold: 0.35, // 0に近ければより厳しい
  maxPatternLength: 32,
  keys: ['title', 'url'],
}

function getTabs() {
  chrome.tabs.query({}, t => {
    tabs = t
    console.log("Tabs stored.")
  })
}

function getHistory() {
  chrome.history.search({ text: '', maxResults: 100 }, h => {
    // maxResultsは履歴の取得数
    history = h
    console.log("History stored.")
  })
}

function getBookmarks() {
  chrome.bookmarks.getTree(tree => {
    bookmarks = treeToFlatList(tree[0])
    console.log("Bookmarks stored.")
  })
}

function getTabsHistory() {
  tabsHistory = mergeAndDeduplicate(tabs, history)
}

function getItems() {
  items = mergeAndDeduplicate(tabsHistory, bookmarks)
}

////////////////////////////////////////////////////////////////////////////////
// 各イベント発生時にリストを更新
////////////////////////////////////////////////////////////////////////////////
// tabがアップデートされたらtabsを取得し直す
chrome.tabs.onUpdated.addListener(() => {
  getTabs()
})

chrome.tabs.onRemoved.addListener(() => {
  getTabs()
})

// historyが変更されたら更新
chrome.history.onVisited.addListener(() => {
  getHistory()
})

// bookmarkがupdateされたら更新する
chrome.bookmarks.onCreated.addListener(() => {
  getBookmarks()
})

chrome.bookmarks.onRemoved.addListener(() => {
  getBookmarks()
})

chrome.bookmarks.onChanged.addListener(() => {
  getBookmarks()
})

chrome.bookmarks.onImportEnded.addListener(() => {
  getBookmarks()
})

// extensionボタンが押されたらcontent scriptsにメッセージ
chrome.browserAction.onClicked.addListener(tab => {
  // extension iconがクリックされたらpopupを表示
  chrome.browserAction.setPopup({ popup: "popup.html" })
  currentTab = tab
  chrome.tabs.sendMessage(tab.id, {}) // 必要？
  getTabsHistory()
  getItems()
  fuse = new Fuse(items, FUSE_OPTION)
  log("initialize completed")
})

////////////////////////////////////////////////////////////////////////////////
// popupからのメッセージを受信し、返信
////////////////////////////////////////////////////////////////////////////////
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // tabsを返信
  if (message.tabsHistory) {
    sendResponse({ tabsHistory: tabsHistory })
  }
  // 検索して結果を返信
  if (message.searchWord) {
    sendResponse({ searchResult: fuse.search(message.searchWord) })
  }
})

// backgroundがロードされたら各リストをつくる
getTabs()
getHistory()
getBookmarks()
