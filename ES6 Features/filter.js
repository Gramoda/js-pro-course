// you need to write a function, which accepts infinite number parameters
// and returns an array, which has the same parameter only once
function filter() {
  let array = []
  for(let elem of arguments)
  {
    if(!array.includes(elem))
    {
      array.push(elem);
    }
  }
  return array;
}

module.exports = filter;
