requireCss('./button/button.css');

var fun  = require('../../uki-core/function'),
    view = require('../../uki-core/view'),
    dom  = require('../../uki-core/dom'),

    Base      = require('../../uki-core/view/base').Base,
    Focusable = require('./focusable').Focusable;


var Button = view.newClass('Button', Base, Focusable, {

    labelHtml: function(value) {
        if (!arguments.length) {
            return this._text.innerHTML;
        }
        this._text.innerHTML = value;
        updateImageOnly.call(this);
        return this;
    },

    label: function(value) {
        return arguments.length ? this.labelHtml(dom.escapeHTML(value)) : this.labelHtml();
    },

    disabled: function(state) {
        if (!arguments.length) {
            return this.dom().disabled;
        }
        this.dom().disabled = state ? 'disabled' : '';
        this.toggleClass('uki-button_disabled', state);
        return this;
    },

    confirm: view.newToggleClassProp('uki-button_confirm'),

    iconSrc: fun.newProp('iconSrc', function(src) {
        dom.removeElement(this._iconDom);
        this._iconSrc = src;
        if (src) {
            this._iconDom = dom.createElement('img',
                { className: 'uki-button__icon', src: src });
            this.dom().insertBefore(this._iconDom, this._text);
        }
        updateImageOnly.call(this);
    }),

    _createDom: function() {
        this._text = dom.createElement('span',
            { className: 'uki-button__text' });
        this._dom = dom.createElement('button',
            { className: 'uki-button', tabIndex: -1 }, [this._text]);
    },

    destruct: function() {
        Focusable.destruct.call(this);
        Base.destruct.call(this);
    }
});

function updateImageOnly () {
    this.toggleClass('uki-button_image-only', !!(this.iconSrc() && !this.labelHtml()));
}

require('../../uki-core/collection').Collection.addProps([
    'labelHTML', 'label', 'disabled', 'confirm', 'iconSrc'
]);
exports.Button = Button;
