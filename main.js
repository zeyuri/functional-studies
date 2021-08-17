const createFunction = () => {
  return function () {
    console.log("hello")
  }
}

const createFunctionPrinter = (string) => () => {
  console.log(string)
}

const addByX = (x) => (y) => x + y

const once = (callback) => {
  let cachedResult = null

  return () => {
    if (!cachedResult) {
      cachedResult = callback()

      return cachedResult
    }
    return cachedResult
  }
}

const after = (delayBy, callback) => {
  let calledMemo = 0
  return () => {
    calledMemo++
    if (calledMemo < delayBy) {
      return
    }
    callback()
  }
}

module.exports = {
  createFunction,
  createFunctionPrinter,
  addByX,
  once,
  after,
}
