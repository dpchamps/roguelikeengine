import { GuiElement } from './Gui';
import { Text, TextStyle, Graphics } from 'pixi.js';
import { application } from '../renderer/application';
import { KeyCode } from '../util/KeyCode';
import { defaultFontStyle, defaultSecondaryFontStyle } from './consts';

export class TextBox extends GuiElement {
  private width: number = 125;
  private height: number = 30;
  private text: Array<string> = [];
  private pages: Array<string> = [];
  private textControlListener: (e: KeyboardEvent) => void = this.textControls.bind(this);
  private readonly charCount = 75;

  exclusiveElement: boolean = true;

  style: TextStyle = defaultFontStyle;
  helpTextStyle: TextStyle = defaultSecondaryFontStyle;

  textNode: Text = new Text('', this.style);
  readMoreText: Text = new Text('Read More', this.helpTextStyle);
  readLessText: Text = new Text('Read Less', this.helpTextStyle);
  closeText: Text = new Text('Close', this.helpTextStyle);

  currentPage: number = 0;

  constructor(text: string | Array<string> = '') {
    super();

    this.text = Array.isArray(text) ? text : [text];
    this.container.x = application.screen.width / 2 - this.width / 2;
    this.container.y = application.screen.height - this.height * 1.5;
    this.initialize();
    this.createPages();
  }

  private splitText(text: string) {
    const words: string[] = text.split(' ');
    const segments = [];
    let segment: string[] = [];
    let count = 0;

    while (words.length > 0) {
      let word = words.shift();
      if (count + word!.length < this.charCount) {
        segment.push(word!);
        count += word!.length;
      } else {
        segments.push(segment.join(' '));
        segment = [word!];
        count = 0;
      }
    }

    if (count > 0) {
      segments.push(segment.join(' '));
    }

    return segments;
  }
  private createPages() {
    this.text.forEach(text => {
      this.pages = this.pages.concat(this.splitText(text));
    });
  }

  private textControls(e: KeyboardEvent) {
    switch (e.key) {
      case '.':
        if (this.hasNextPage()) {
          this.nextPage();
        } else {
          this.destroy();
        }
        break;
      case ',':
        this.lastPage();
        break;
    }
  }

  private hasNextPage() {
    return this.currentPage < this.pages.length - 1;
  }

  private hasPreviousPage() {
    return this.currentPage > 0;
  }

  private setStyle() {
    this.textNode.position.set(2, 0);
    this.textNode.resolution = 2;
  }

  private setTextBoxBg() {
    this.addRect(this.width, this.height, 0x0000a7, [2, 0x000007, 1]);
  }

  private setTextNode(page: number = 0) {
    this.add(this.textNode);
  }

  private setHelpText() {
    this.readMoreText.x = this.width - this.readMoreText.width + 1;
    this.readMoreText.y = this.height - 6;
    this.readMoreText.visible = this.hasNextPage();

    this.closeText.x = this.width - this.closeText.width + 1;
    this.closeText.y = this.height - 6;
    this.closeText.visible = !this.hasNextPage();

    this.readLessText.x = 0;
    this.readLessText.y = this.height - 6;
    this.readLessText.visible = this.hasPreviousPage();

    this.add(this.readMoreText);
    this.add(this.readLessText);
    this.add(this.closeText);
  }

  private setTextMask() {
    const mask = this.addRect(this.width - 2, this.height - 4, 0x000000, []);
    mask.x = 1;
    mask.y = 1;
    this.textNode.mask = mask;
  }

  private initialize() {
    this.setStyle();
    this.setTextBoxBg();
    this.setTextNode(this.currentPage);
    this.setTextMask();
    this.setHelpText();
  }

  private update() {
    this.textNode.text = this.pages[this.currentPage];
    this.setTextNode(this.currentPage);
    this.setHelpText();
  }

  onAttached() {
    super.onAttached();
    document.addEventListener('keydown', this.textControlListener);
  }

  isOpen() {
    return this.container.visible;
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPage += 1;
      this.update();
    }
  }

  lastPage() {
    if (this.hasPreviousPage()) {
      this.currentPage -= 1;
      this.update();
    }
  }

  destroy() {
    super.destroy();
    document.removeEventListener('keydown', this.textControlListener);
  }

  reset() {
    this.currentPage = 0;
    this.update();
  }

  render() {
    super.render();
    this.update();

    return this.container;
  }
}
