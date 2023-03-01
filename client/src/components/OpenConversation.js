import React, { useState, useCallback } from "react";
import { Form, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import { useConversation } from "../contexts/ConversationsProvider";

export default function OpenConversation() {
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const { sendMessage, selectedConversation } = useConversation();
  const [text, setText] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  }
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column justify-content-end align-items-start px-3">
          {selectedConversation.messages.map((message, index) => {
            return (
              <div
                key={index}
                ref={setRef}
                className={`my-1 d-flex flex-column ${
                  message.fromMe ? "align-self-end" : ""
                } `}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`small text-muted ${
                    message.fromMe ? "text-end" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="m-2">
          <InputGroup>
            <FormControl
              as="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <InputGroup.Text as="button" className="bg-primary" type="submit">
              Send
            </InputGroup.Text>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
}
