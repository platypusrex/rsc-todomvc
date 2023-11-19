import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from '~/db/index';

migrate(db, { migrationsFolder: './src/db/migrations' })
  .then(() => {
    console.log('Migrations complete');
    process.exit(0);
  })
  .catch((e) => {
    console.error('Migrations failed:', e.message);
    process.exit(1);
  });
