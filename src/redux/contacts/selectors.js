import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filter';

export const selectContacts = (state) => state.contacts.items;

export const selectIsLoading = (state) => state.contacts.isLoading;

export const selectError = (state) => state.contacts.error;

export const selectStatus = (state) => state.contacts.status;

export const selectVisibleContacts = createSelector([
  selectContacts,
  selectFilter,
], (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedFilter);
  });
});

export const selectContactsLength = createSelector([selectContacts],
  (contacts) => {
    return contacts.length;
  },
);

