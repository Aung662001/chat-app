import React from "react";
import { useConversation } from "../contexts/ConversationsProvider";
import Navbar from "./Navbar";
import OpenConversation from "./OpenConversation";

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversation();
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Navbar id={id} />
      {selectedConversation && <OpenConversation />}
      {/* if selectedConversation has render <OpenConversation /> */}
    </div>
  );
}
