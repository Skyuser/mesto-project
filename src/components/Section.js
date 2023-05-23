export default class Section {
    constructor({ items, renderer }, selector) {
      this._rendItems = items;
      this._renderer = renderer;
      this._container = document.querySelector(selector);
    }
  
    addItem(item) {
      this._container.prepend(item);
    }

    clear() {
      this._container.innerHTML = '';
    }

    renderItems() {
      this.clear();
      this._rendItems.forEach((item) => {
        const element = this._renderer(item);
        return element;
      });
    }
  }