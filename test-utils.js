const { performance } = require('perf_hooks')

const colors = {
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  cancel: '\033[0m'
}

const print = {
  positive(msg) {
    console.log(colors.bgGreen + msg + colors.cancel)
  },
  negative(msg) {
    console.log(colors.bgRed + msg + colors.cancel)
  }
}

const expect = (actual) => {
  return {
    toBe(expected) {
      if (expected === actual) {
        console.log('\n')
        print.positive('Test passed!')
      } else {
        throw new Error(`Actual value \`${actual}\` is not equal to an expected value \`${expected}\``)
      }
    }
  }
}

const test = (title, cb) => {
  const perfString = `test \`${title}\` took`
  try {
    console.time(perfString)

    cb()
  } catch(e) {
    console.log('\n')
    print.negative(`-- ${title} --- \n ${e.message}`)
  } finally {
    console.log('\n')
    console.timeEnd(perfString)
  }
}

module.exports = {
  expect,
  test
}
