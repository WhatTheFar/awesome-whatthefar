export * from './data';
export * from './template';

import { main } from './main';

if (require.main === module) {
	main();
}
