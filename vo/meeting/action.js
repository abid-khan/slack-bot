/**
 * Created by abidkhan on 10/05/17.
 */
'use strict';

class Action{

    constructor(inputName, inputText, inputValue, inputStyle) {
        this.name = inputName;
        this.text = inputText;
        this.value = inputValue
        this.style=inputStyle;
        this.type = "button";
    }
}

module.exports = Action;
