import { resolve } from 'path';

export const createPathAppendFunction = (path: string) => (...pathSegments: string[]) =>
	resolve(path, ...pathSegments);

export const GENERATED_ROOT_DIR = resolve(__dirname, 'generated');

export const CONTENT_DIR = resolve(GENERATED_ROOT_DIR, 'content');

export const GENERATED_CONTENT_DIR = resolve(CONTENT_DIR, 'generated');

export const ASSET_DIR = resolve(CONTENT_DIR, 'asset');

export const BOOK_NOTE_DIR = resolve(CONTENT_DIR, 'book-note');

// Helper function

export const getAssetPath = createPathAppendFunction(ASSET_DIR);

export const getBookNotePath = createPathAppendFunction(BOOK_NOTE_DIR);
