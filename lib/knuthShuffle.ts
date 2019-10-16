const knuthShuffle = (array) => {
  // This does an in-place shuffle of an array and is order O(n)
  // Also known as the Fisher-Yates shuffle.
  let currentIndex = array.length;
  // copy input array to a variable to stop ESlint having a cry when we change it
  const out = array;
  let temporaryValue;
  let randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = out[currentIndex];
    out[currentIndex] = out[randomIndex];
    out[randomIndex] = temporaryValue;
  }
  return out;
};

export default knuthShuffle;
