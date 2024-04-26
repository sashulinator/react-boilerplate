# a-Button

## Description

Button

## Subtree

### `pull`/`push`

```bash
# Push
git subtree push --prefix=src/abstract/button a-button master
# Pull
git subtree pull --prefix=src/abstract/button a-button master
# Force
git push a-button `git subtree split --prefix=src/abstract/button @`:master --force
```

### `diff`

```
git --no-pager diff a-button/master master:src/abstract/button
```

### Add to your project

1. Add a repository alias `git remote add a-button git@github.com:sashulinator/a-button.git`
2. To check a list of aliases `git remote -v`, you must see `a-button`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/abstract/button a-button master`
