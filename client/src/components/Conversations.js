import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useConversation } from "../contexts/ConversationsProvider";

export default function Conversation() {
  const { conversations, selectConversationIndex } = useConversation();
  return (
    <>
      <ListGroup variant="flush">
        {conversations.map((conversation, index) => {
          return (
            <ListGroupItem
              key={index}
              action
              onClick={() => selectConversationIndex(index)}
              active={conversation.selected}
            >
              {conversation.recipients.map((r) => r.name).join(",")}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </>
  );
}
//-------------->messages[]
// conversations>
//-------------->recipients>[{id,name},{id,name}]
