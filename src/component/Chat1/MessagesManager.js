'use strict';


class MessagesManager {


    static appendMessages(historyMessages = [], messages, inverted = true) {
        if (!Array.isArray(messages)) {
            messages = [messages];
        }

        return inverted ? messages.concat(historyMessages) : historyMessages.concat(messages);
    }

}

export default MessagesManager