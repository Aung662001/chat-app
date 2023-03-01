import React from "react";
import { useContects } from "../contexts/ContectsProvider";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { v4 } from "uuid";

export default function Contacts() {
  const { contacts } = useContects();
  return (
    <ListGroup varient="flush">
      {contacts.map((contact) => {
        return <ListGroupItem key={v4()}>{contact.name}</ListGroupItem>;
      })}
    </ListGroup>
  );
}
