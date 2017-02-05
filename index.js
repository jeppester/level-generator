(function (root, factory) {
  if (typeof module === 'object') {
    module.exports = factory();
  }
  else {
    root.LevelGenerator = factory();
  }
}(this, function () {
  function LevelGenerator() {
    console.log('I am a level generator');
  }

  return LevelGenerator;
}))
