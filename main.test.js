const {
  createFunction,
  createFunctionPrinter,
  addByX,
  once,
  after,
} = require("./main")

const consoleMock = {
  log: jest.fn(),
}

describe("createFunction", () => {
  it('should return a function that when called, invokes console.log with "hello"', () => {
    // prepare
    global.console = consoleMock

    //act
    const createdFuncion = createFunction()

    createdFuncion()
    //assert
    expect(typeof createdFuncion).toBe("function")
    expect(consoleMock.log).toHaveBeenCalledWith("hello")
  })
})

describe("createFunctionPrinter", () => {
  it("should return a function that when called, invokes console.log with the argument of the first call", () => {
    // prepare
    global.console = consoleMock
    const toBePrinted = "batata"

    //act
    const batataPrinter = createFunctionPrinter(toBePrinted)
    batataPrinter()

    //assert
    expect(typeof batataPrinter).toBe("function")
    expect(consoleMock.log).toHaveBeenCalledWith(toBePrinted)
  })
})

describe("addByX", () => {
  it("should return a function that when called with any number return that number added with the number of the first call", () => {
    const add2 = addByX(2)

    const result = add2(3)

    expect(result).toBe(5)
  })
})

describe("once", () => {
  it("should return a funcion", () => {
    const callback = jest.fn()

    const oncyfied = once(callback)

    expect(typeof oncyfied).toBe("function")
  })

  it("should return a function and this function when called should call the callback that was the argument of the first function", () => {
    const expected = "batata"

    const callback = jest.fn().mockReturnValue(expected)

    const oncyfied = once(callback)

    const result = oncyfied()

    expect(callback).toHaveBeenCalled()
    expect(result).toBe(expected)
  })

  it("should return a function that calls the callback just one time and remember the result", () => {
    const expected = "batata"

    const callback = jest.fn().mockReturnValue(expected)

    const oncyfied = once(callback)

    const resultOfTheFirstCall = oncyfied()

    expect(callback).toHaveBeenCalledTimes(1)
    expect(resultOfTheFirstCall).toBe(expected)

    const resultOfSecondCall = oncyfied()

    expect(callback).toHaveBeenCalledTimes(1)
    expect(resultOfSecondCall).toBe(resultOfSecondCall)
  })
})

describe("after", () => {
  it("should return a function", () => {
    const callback = jest.fn()

    const aftered = after(3, callback)

    expect(typeof aftered).toBe("function")
  })

  it("given that is called with arguments 3 and a callback, should return a function that will only call the callback after been called 3 times", () => {
    const callback = jest.fn()

    const afterCalled = after(3, callback)

    afterCalled()
    afterCalled()
    afterCalled()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
