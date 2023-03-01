import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContects } from "../contexts/ContectsProvider";

export default function NewContactModal({ closeModal }) {
  const nameRef = useRef();
  const idRef = useRef();
  const { createContact } = useContects();

  function submitHandle(e) {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  }
  return (
    <>
      <Modal.Header closeButton>Create Contact </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandle}>
          <Form.Group>
            <Form.Label>Enter Id:</Form.Label>
            <Form.Control type="text" required ref={idRef}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter Name:</Form.Label>
            <Form.Control type="text" required ref={nameRef}></Form.Control>
          </Form.Group>
          <Button type="submit" className="mt-3">
            Add Contact
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
