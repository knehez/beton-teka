import UserInitializer from './userInitializer';
import RoleInitializer from './roleInitializer';
import { Initializer } from './initializer';
import CategoryInitializer from './categoryInitializer';

export default async function initializeDatabase () {
    const initializers: Initializer[] = [
        new RoleInitializer,
        new UserInitializer,
        new CategoryInitializer
    ];

    for (const initializer of initializers) {
        await initializer.initialize();
    }
}
