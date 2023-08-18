Read me

Notion:
create extension ltree;

CREATE INDEX path_gist_idx ON page USING GIST (path);

