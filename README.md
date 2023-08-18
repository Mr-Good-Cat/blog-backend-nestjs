Read me

Notion:
create extension ltree;

CREATE INDEX path_gist_idx ON page USING GIST (path);

first typeorm start. need 
```yarn run typeorm```

generate migration
```
yarn run migration:generate page-table && yarn run migration:move
```

