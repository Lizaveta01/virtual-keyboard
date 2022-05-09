import { keyboardFragment, keyboardKeys } from './keys.js';

class Keyboard {
  constructor() {
    this.caps = false;
    this.lang = localStorage.getItem('lang') === 'ru' ? 'ru' : 'en';
  }

  init() {
    // Create main elements
    this.wrapper = document.createElement('main');
    this.title = document.createElement('h1');
    this.text = document.createElement('textarea');
    this.keyboard = document.createElement('div');
    const keyboardRow = document.createElement('div');
    this.description = document.createElement('p');
    this.language = document.createElement('p');

    // Setup main elements
    this.wrapper.classList.add('wrapper');

    this.title.classList.add('title');
    this.title.textContent = 'RSS Virtual keyboard';

    this.text.autofocus = true;
    this.text.classList.add('text');

    this.keyboard.classList.add('keyboard');
    keyboardRow.classList.add('keyboard__row');

    this.description.classList.add('info');
    this.description.textContent = 'This keyboard was developed and tested in Microsoft Windows.';

    this.language.classList.add('info');
    this.language.textContent = 'To switch ENG/РУС input methods, press Ctrl+Alt on Windows/Linux or Cmd+Alt on Mac.';

    // Add to DOM
    this.keyboard.appendChild(keyboardFragment);
    this.showLanguage(this.lang);

    this.wrapper.appendChild(this.title);
    this.wrapper.appendChild(this.text);
    this.wrapper.appendChild(this.keyboard);
    this.wrapper.appendChild(this.description);
    this.wrapper.appendChild(this.language);

    document.body.appendChild(this.wrapper);

    this.createListeners();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
})