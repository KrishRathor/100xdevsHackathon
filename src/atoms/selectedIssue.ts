import { atom } from "recoil";

export const selectedIssueState = atom({
  key: 'selectedIssueState',
  default: {
    title: '',
    number: 0
  }
})
