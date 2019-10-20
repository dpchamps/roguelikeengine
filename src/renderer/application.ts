import { Application, autoDetectRenderer, Container } from 'pixi.js';

export const application = new Application();

application.renderer = autoDetectRenderer({
  width: 176,
  height: 176,
  antialias: true,
  transparent: false,
  resolution: window.devicePixelRatio,
});

application.stage = new Container();
application.renderer.backgroundColor = 0x0;
