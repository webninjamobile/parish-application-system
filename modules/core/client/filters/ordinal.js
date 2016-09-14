angular
  .module('core')
  .filter('ordinal', function() {
    return function(n) {
      var s=["th","st","nd","rd"],
        v=n%100;
      return (s[(v-20)%10]||s[v]||s[0]);
    };
  })