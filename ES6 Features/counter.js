function createCounter(initialValue) {
  let count = initialValue ? initialValue : 0;
  
  return {
    count: initialValue ? initialValue : 0,
    showValue: () => {
      return count;
    },

    increment: function (value) {
      value ? count += value : count += 1;
      return this;
    },

    decrement: function (value) {
      value ? count -= value : count -= 1;
      return this;
    },

    discard: function () {
      count = initialValue ? initialValue : 0;
      return this;
    }
  }
}


module.exports = createCounter;
