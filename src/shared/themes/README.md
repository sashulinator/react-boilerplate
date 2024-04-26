# theme-colibri

## Description

Main Colibri Theme

## Subtree

### `pull`/`push`

```bash
# Push
git subtree push --prefix=src/shared/themes/colibri theme-colibri master
# Pull
git subtree pull --prefix=src/shared/themes/colibri theme-colibri master
# Force
git push theme-colibri `git subtree split --prefix=src/shared/themes/colibri @`:master --force
```

### `diff`

```
git --no-pager diff theme-colibri/master master:src/shared/themes/colibri
```

### Add to your project

1. Add a repository alias `git remote add theme-colibri git@github.com:sashulinator/theme-colibri.git`
2. To check a list of aliases `git remote -v`, you must see `theme-colibri`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/shared/themes/colibri theme-colibri master`
