import React from "react";
import uselocalStorage from "../hooks/useLocalStorage";
import { useContext } from "react";

const Contexts = React.createContext();
//to review here
export function useContects() {
  return useContext(Contexts);
}
export default function ContactsProvider({ children }) {
  const [contacts, setContacts] = uselocalStorage("contacts", []);

  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }
  return (
    <Contexts.Provider value={{ contacts, createContact }}>
      {children}
    </Contexts.Provider>
  );
}
