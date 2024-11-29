npx ts-node ./node_modules/typeorm/cli.js migration:generate ./src/migration/InitialMigration -d src/data-source.ts

npx typeorm migration:generate ./src/migration/addscore -d dist/data-source.js



npm install
npm run migration:run
npm run build
npm start
