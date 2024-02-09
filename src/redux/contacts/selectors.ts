import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filter';
import { RootState } from '../store';

export const selectContacts = (state: RootState) => state.contacts.items;

export const selectIsLoading = (state: RootState) => state.contacts.isLoading;

export const selectError = (state: RootState) => state.contacts.error;

export const selectStatus = (state: RootState) => state.contacts.status;

export const selectVisibleContacts = createSelector([
  selectContacts,
  selectFilter,
], (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(({ name }: { name: string }) => {
    return name.toLowerCase().includes(normalizedFilter);
  });
});

export const selectContactsLength = createSelector([selectContacts],
  (contacts) => {
    return contacts.length;
  },
);

