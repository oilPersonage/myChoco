import '../html/index.html'
import '../html/photograph.html'
import '../html/training.html'
import './pubsub'
import './carousel'
import './humburger'
import './photo'
import './training'
// import './pixiDepth'
import './indexLazy'

import '../sass/main.sass'


if (module.hot) {
  module.hot.accept('./index.js', function() {
    console.log('Accepting the updated printMe module!');
    })
}
