export default class Section {
    constructor({ renderer }, selector) {
      this._renderer = renderer;
      this._container = document.querySelector(selector);
    }
  
    addItem(item) {
      this._container.prepend(item);
    }

    clear() {
      this._container.innerHTML = '';
    }

    renderItems(items) {
      this.clear();
      items.forEach((item) => {
        this.addItem(item);
      });
    }
  }