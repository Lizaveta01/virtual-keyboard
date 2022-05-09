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

  createListeners() {
    this.text.addEventListener('blur', () => {
      setTimeout(() => {
        this.text.focus();
      }, 0);
    });

    document.addEventListener('keydown', (e) => {
      e.stopImmediatePropagation();

      const key = document.getElementById(e.code);
      if (!key) {
        e.preventDefault();
        return;
      }

      if (e.code === 'CapsLock' && !e.repeat) {
        e.preventDefault();
        this.caps = !this.caps;

        const addRemove = this.caps ? 'add' : 'remove';
        key.classList[addRemove]('active');

        this.switchCaps(e.shiftKey);
      } else {
        key.classList.add('active');

        if ((e.ctrlKey || e.metaKey) && e.altKey && !e.repeat) {
          e.preventDefault();
          this.lang = this.lang === 'ru' ? 'en' : 'ru';
          localStorage.setItem('lang', this.lang);
          this.showLanguage(this.lang, e.shiftKey);
        } else if (!keyboardKeys[e.code].func) {
          e.preventDefault();
          this.insertText(key.textContent);
        } else if (e.key === 'Shift' && !e.repeat) {
          e.preventDefault();
          this.switchCaps(e.shiftKey);
        } else if (e.code === 'Tab') {
          e.preventDefault();
          this.insertText('\t');
        } else if (e.code === 'Enter') {
          e.preventDefault();
          this.insertText('\n');
        } else if (e.code === 'Backspace') {
          e.preventDefault();
          this.pressBackspace();
        } else if (e.code === 'Delete') {
          e.preventDefault();
          this.pressDelete();
        } else if (e.code === 'ArrowUp' && !e.isTrusted) {
          this.arrowUp();
        } else if (e.code === 'ArrowDown' && !e.isTrusted) {
          this.arrowDown();
        } else if (e.code === 'ArrowLeft' && !e.isTrusted) {
          this.arrowLeft();
        } else if (e.code === 'ArrowRight' && !e.isTrusted) {
          this.arrowRight();
        }
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
})