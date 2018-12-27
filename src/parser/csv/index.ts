import { parse } from 'papaparse';
import * as rp from 'request-promise-native';

export interface FileInput {
	type: 'FileInput';
	filePath: string;
}
export interface GoogleSheetInput {
	type: 'GoogleSheetInput';
	publishedId: string;
	sheetId: string;
}

export type CsvInput = FileInput | GoogleSheetInput;

function parseGoogleSheetUrl({ publishedId, sheetId }: GoogleSheetInput): string {
	return (
		'https://docs.google.com/spreadsheets/d/e/' +
		publishedId +
		'/pub?gid=' +
		sheetId +
		'&single=true&output=csv'
	);
}

async function parseCsvFromText(
	inputData: string | NodeJS.ReadableStream
): Promise<Papa.ParseResult> {
	return new Promise<Papa.ParseResult>(resolve => {
		if (typeof inputData === 'string') {
			parse(inputData, {
				complete: resolve
			});
		} else {
			parse(inputData, {
				complete: resolve
			});
		}
	});
}

// export async function parseCsvFromInput(input: FileInput): Promise<Papa.ParseResult>;
// export async function parseCsvFromInput(
// 	input: GoogleSheetInput
// ): Promise<Papa.ParseResult>;
// export async function parseCsvFromInput(input: CsvInput): Promise<Papa.ParseResult>;
export async function parseCsvFromInput(input: CsvInput): Promise<Papa.ParseResult> {
	let csvInput: string;

	switch (input.type) {
		case 'FileInput':
			csvInput = input.filePath;
			break;
		case 'GoogleSheetInput':
			csvInput = await rp(parseGoogleSheetUrl(input));
			break;
		default:
			const _exhaustiveCheck: never = input;
			return _exhaustiveCheck;
	}

	const result = await parseCsvFromText(csvInput);

	return result;

	// Method 1
	// const data = await rp(csvInput);
	// const result = await parseCsv(data);
	// return result;

	// Method 1.2
	// const data = await rp(csvInput);
	// fs.writeFileSync('temp.csv', data);
	// const result = await parseCsv(fs.createReadStream('temp.csv'));
	// return result;

	// Method 2
	// const writeStream = fs.createWriteStream('temp.csv');
	// request(csvInput).pipe(writeStream);

	// const result = await new Promise<Papa.ParseResult>((resolve, reject) => {
	// 	writeStream.on('finish', () => {
	// 		parseCsv(fs.createReadStream('temp.csv')).then(resolve);
	// 	});
	// });

	// return result;
}
