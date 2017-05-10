/**
 * Created by abidkhan on 10/05/17.
 */
'use strict';

class Meeting {
    constructor(inputeTitle, inputText, inputColor, inputCallbackId, inputFields, inputActions) {
        this.title = inputeTitle;
        this.text = inputText;
        this.color = inputColor;
        this.callback_id = inputCallbackId;
        this.fields = inputFields;
        this.actions = inputActions;
    }
}

module.exports = Meeting;
