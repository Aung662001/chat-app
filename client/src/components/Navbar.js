import React, { useState } from "react";
import { Button, Modal, Nav, NavLink, Tab } from "react-bootstrap";
import Conversations from "./Conversations";
import Contects from "./Contacts";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";

const CONVERSATION_KEY = "conversation";
const CONTACTS_KEY = "contacts";

export default function Navbar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATION_KEY);
  const conversationOpen = activeKey === CONVERSATION_KEY;
  const [modalOpen, setModalOpen] = useState(false);
  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <NavLink eventKey={CONVERSATION_KEY}>Conversation</NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink eventKey={CONTACTS_KEY}>Contacts</NavLink>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-end overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATION_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contects />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-end small">
          Your Id:<span className="text-muted">{id}</span>
        </div>
        <Button
          className="rounded-0"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          New {conversationOpen ? "Conversation" : "Contact"}
        </Button>

        <Modal show={modalOpen} onHide={closeModal}>
          {conversationOpen ? (
            <NewConversationModal closeModal={closeModal} />
          ) : (
            <NewContactModal closeModal={closeModal} />
          )}
        </Modal>
      </Tab.Container>
    </div>
  );
}
