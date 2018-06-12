'use strict';


class MessagesManager {


    static appendMessages(currentMessages = [], messages, inverted = true) {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        return inverted ? messages.concat(currentMessages) : currentMessages.concat(messages);
    }

}

export default MessagesManager