import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export function mkdirpSync(dir: string) {
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
}

export const createPathAppendFunction = (path: string) => (...pathSegments: string[]) =>
	resolve(path, ...pathSegments);

export const GENERATED_ROOT_DIR = resolve(__dirname, '..', '..', 'generated');

export const CONTENT_DIR = resolve(GENERATED_ROOT_DIR, 'content');

export const GENERATED_CONTENT_DIR = resolve(GENERATED_ROOT_DIR, 'generated');

export const GENERATED_PODCAST_NOTE_DIR = resolve(GENERATED_CONTENT_DIR, 'podcast-note');

export const ASSET_DIR = resolve(CONTENT_DIR, 'asset');

export const BOOK_NOTE_DIR = resolve(CONTENT_DIR, 'book-note');

export const PODCAST_NOTE_DIR = resolve(CONTENT_DIR, 'podcast-note');

export const MYERS_BRIGGS_DIR = resolve(CONTENT_DIR, 'myers-briggs');

// Helper function

export const getAssetPath = createPathAppendFunction(ASSET_DIR);

export const getBookNotePath = createPathAppendFunction(BOOK_NOTE_DIR);

export const getPodcastNotePath = createPathAppendFunction(PODCAST_NOTE_DIR);

export const getGeneratedPodcastNotePath = createPathAppendFunction(
	GENERATED_PODCAST_NOTE_DIR
);

export function initDir(): void {
	mkdirpSync(GENERATED_CONTENT_DIR);
	mkdirpSync(GENERATED_PODCAST_NOTE_DIR);
}

