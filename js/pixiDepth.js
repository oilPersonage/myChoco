import * as PIXI from 'pixi.js'
import img1 from '../img/about.jpg'
import mask from '../img/dep-map.jpg'

if (document.querySelector('#home')) {
  let app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
  console.log({app, PIXI})
  document.querySelector('.canvasBox').appendChild(app.view);

  let img = new PIXI.Sprite.from(img1);
  // img.width = window.innerWidth;
  // img.height = window.innerHeight;
  app.stage.addChild(img);

  const depthMap = new PIXI.Sprite.from(mask);
  app.stage.addChild(depthMap);

  const displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
  app.stage.filters = [displacementFilter];

  window.onmousemove = function(e) {
    displacementFilter.scale.x = (window.innerWidth / 2 - e.clientX) /200;
    displacementFilter.scale.y = (window.innerHeight / 2 - e.clientY) /200;
  };
}