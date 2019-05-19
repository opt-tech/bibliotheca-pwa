import { Book, RouteEntry } from 'bibliotheca/types';
import { lazy } from 'navi';
import { createActions } from 'typeless';

// --- Constants ---
export const MODULE = 'borrowOrReturn';

// --- Actions ---
export const BorrowOrReturnActions = createActions(MODULE, {
  $mounted: null,
  fetchBookFromBarcode: (code: string) => ({ payload: { code } }),
  fetchBookFromBarcodeFullfilled: (books: Book[], userId: string, loadedCode: string) => ({
    payload: { books, userId, loadedCode },
  }),
});

// --- Routing ---
export const routeEntry: RouteEntry = {
  path: '/borrow-or-return',
  routes: lazy(() => import('./routes')),
};

// --- Types ---
export interface BorrowOrReturnState {
  target: BarcodeProcessTarget | undefined;
  isProcessingBook: boolean;
}
export type BarcodeProcessTarget = NotExistBookInList | ExistBookInList;

interface NotExistBookInList {
  loadedCode: string;
  existsBookInList: false;
}

interface ExistBookInList {
  loadedCode: string;
  book: Book;
}
declare module 'typeless/types' {
  export interface DefaultState {
    borrowOrReturn: BorrowOrReturnState;
  }
}
