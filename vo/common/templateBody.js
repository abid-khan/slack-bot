/**
 * Created by arvindkasale on 5/11/17.
 */
'use strict';
class TemplateBody {
    constructor(inputeTitle, inputText, inputColor, inputCallbackId, inputFields, inputActions) {
        this.title = inputeTitle;
        this.text = inputText;
        this.color = inputColor;
        this.callback_id = inputCallbackId;
        this.fields = inputFields;
        this.actions = inputActions;
    }
}

module.exports = TemplateBody;