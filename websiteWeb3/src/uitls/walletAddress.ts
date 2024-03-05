const maskMiddleDigits = (str: String) => {
    try {
      const firstStr = str.slice(0, 5)
      const endStr = str.slice(-5)
      return `${firstStr}*****${endStr}`
    } catch (error) {
      return console.log(error)
    }
  }