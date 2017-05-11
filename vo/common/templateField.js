/**
 * Created by abidkhan on 10/05/17.
 */
'use strict';

class TemplateField {
    constructor(inputTitle, inputValue, isShort) {
        this.title = inputTitle;
        this.value = inputValue;
        this.short = isShort;
    }

}

module.exports = TemplateField;
