import moduleAlias from 'module-alias';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get the current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Register aliases
moduleAlias.addAliases({
    '@androidScreens': join(__dirname, '../screenobjects/android'),
    '@iosScreens': join(__dirname, '../screenobjects/ios')
});