import { TableDataMapperFunction } from '@awesome/parser/lib/markdown/table/mapper';

export function createSoundCloundUrlDataMapperFunc(
	prefix: string
): TableDataMapperFunction {
	return (postfix: string, _index: number, _row: string[], ctx) =>
		`https://soundcloud.com/${prefix}/${postfix}`;
}
