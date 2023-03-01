import React, { useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { useContects } from "../contexts/ContectsProvider";
import { useConversation } from "../contexts/ConversationsProvider";

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { createConversation } = useConversation();

  function submitHandle(e) {
    e.preventDefault();
    createConversation(selectedContactIds); //received in Provider as recipients ->IDs
    closeModal();
  }
  //this function to handle checkbox mark and unmark
  //if ContactsId contain in prevSelectedContactIDs it will return true
  function handleCheckboxChange(ContactId) {
    setSelectedContactIds((prevSelectedContectIds) => {
      console.log(prevSelectedContectIds);
      if (prevSelectedContectIds.includes(ContactId)) {
        return prevSelectedContectIds.filter((prevIds) => {
          // console.log(prevIds !== ContactId, "this is inside handle checkbox");
          return prevIds !== ContactId;
        });
      } else {
        // console.log("else state", ContactId);
        return [...prevSelectedContectIds, ContactId];
      }
    });
  }
  const { contacts } = useContects();
  return (
    <>
      <Modal.Header closeButton>Create Contact </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandle}>
          {contacts.map((contact) => (
            <FormGroup controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </FormGroup>
          ))}
          <Button type="submit">Create </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
