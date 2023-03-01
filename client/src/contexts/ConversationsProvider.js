import React, { useState, useContext, useEffect, useCallback } from "react";
import uselocalStorage from "../hooks/useLocalStorage";
import { useContects } from "./ContectsProvider";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversation() {
  return useContext(ConversationsContext);
}
export default function ConversationProvider({ children, id }) {
  const [selectConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContects();
  const [conversations, setConversations] = uselocalStorage(
    "conversations",
    []
  );
  const socket = useSocket();
  ///recipients is selectedContactsId->IDs
  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }
  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        // console.log(prevConversations);
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversation = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });
        if (madeChange) {
          return newConversation;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );
  //recipients will be id of receiver contect
  //sender:id is my id
  //text is message that i send

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);
    return () => {
      socket.off("receive-message");
    };
  }, [socket, addMessageToConversation]);

  function sendMessage(recipients, text) {
    socket.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversation = conversations.map((conversation, index) => {
    const recipients /*ID of contacts*/ = conversation.recipients.map(
      (recipient) => {
        const contact = contacts.find((contact) => {
          return contact.id === recipient; //return ID same with recipient
        });
        const name = (contact && contact.name) || recipient;

        return { id: recipient, name };
      }
    );

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectConversationIndex;
    // console.log(messages, "messages");
    return { ...conversation, recipients, selected, messages }; //recpients is id and name
  });
  const value = {
    conversations: formattedConversation,
    sendMessage,
    selectedConversation: formattedConversation[selectConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
//two ids of receiver
function arrayEquality(a, b) {
  return true;
}
