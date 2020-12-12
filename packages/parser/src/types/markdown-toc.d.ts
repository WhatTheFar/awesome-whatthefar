declare module 'markdown-toc' {
	interface toc {
		content: string;
	}

	function toc(text: string, options?: { firsth1?: boolean }): toc;

	export = toc;
}
