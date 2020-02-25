/**
 * オブジェクトや配列などを操作する汎用関数などを書くファイル
 */

/**
 * ２つのobject arrayからkeyが重複するobjectを排除した新しいobject arrayをつくる
 * @param arrx object array
 * @param arry object array
 */
export function mergeAndDeduplicate(arrx, arry) {
  let mergedArr = arrx.concat(arry)
  let cleanArr = mergedArr.filter((objx, ix, objArr) => {
    return (objArr.findIndex(objy => {
      return (objx.url === objy.url)
    }) === ix)
  })
  return cleanArr
}

/**
 * tree構造を一次元のリストにする
 */
export function treeToFlatList (tree) {
  function loop(node, result) {
    if (node.url) { // urlを持っていればアイテム、持ってなければディレクトリ
      result.push(node)
    } else if (node.children) {
      for(let i = 0; i < node.children.length; i++) {
        const item = node.children[i]
        loop(item, result)
      }
    }
    return result
  }
  return loop(tree, [])
}