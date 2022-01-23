import { atom } from "recoil";

export const loggedInUser = {
    id: "1",
    username: "ashutosh",
    name: "Ashutosh",
};

export const chatActiveContact = {
 
    id: "3",
    username: "aashish",
    name: "Aashish",
  };

export const chatMessages = atom({
  key: "chatMessages",
  default: [],
  persistence_UNSTABLE: {
    type: "chatMessages",
  },
});
