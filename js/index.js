import '../html/index.html'
import './pubsub'
import './carousel'
import './humburger'

import '../sass/main.sass'


if (module.hot) {
  module.hot.accept('./index.js', function() {
    console.log('Accepting the updated printMe module!');
    })
}
