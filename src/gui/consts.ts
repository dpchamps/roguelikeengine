import { TextStyle } from 'pixi.js';
import { application } from '../renderer/application';

export const defaultFontStyle = new TextStyle({
  fontSize: `${14 / application.renderer.resolution}px`,
  fontWeight: 'bold',
  fill: 'white',
  wordWrap: true,
  wordWrapWidth: 102,
  lineHeight: 7,
});

export const defaultSecondaryFontStyle = new TextStyle({
  fontFamily: 'Arial',
  fontSize: '5pt',
  fontWeight: 'bold',
  fill: 'white',
});
