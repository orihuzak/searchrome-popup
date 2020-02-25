
const objArr1 = [
  {
    url: "okane"
  },
  {
    url: "suitou"
  }
]

const objArr2 = [
  {
    url: "makura"
  },
  {
    url: "okane"
  }
]

function mergeuDeduplicateforUrl(arrx, arry) {
  let mergedArr = arrx.concat(arry)
  let cleanArr = mergedArr.filter((objx, ix, objArr) => {
    return (objArr.findIndex(objy => {
      return (objx.url === objy.url)
    }) === ix)
  })
  return cleanArr
}

function deduplicate(arr1, arr2) {
  arr2.forEach(item2 => {
    let flag = true
    arr1.forEach(item1 => {
      if (item1.url === item2.url) {
        flag = false
        return
      }
    })
    if (flag) arr1.push(item2)
  })
  return arr1
}

console.log(mergeuDeduplicateforUrl(objArr1, objArr2))
// console.log(deduplicate(objArr1, objArr2))
