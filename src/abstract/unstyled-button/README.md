# a-UnstyledButton

## Description

Unstyled Button

## Subtree

### `pull`/`push`

```bash
# Push
git subtree push --prefix=src/abstract/unstyled-button a-unstyled-button master
# Pull
git subtree pull --prefix=src/abstract/unstyled-button a-unstyled-button master
# Force
git push a-unstyled-button `git subtree split --prefix=src/abstract/unstyled-button @`:master --force
```

### `diff`

```
git --no-pager diff a-unstyled-button/master master:src/abstract/unstyled-button
```

### Add to your project

1. Add a repository alias `git remote add a-unstyled-button git@github.com:sashulinator/a-unstyled-button.git`
2. To check a list of aliases `git remote -v`, you must see `a-unstyled-button`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/abstract/unstyled-button a-unstyled-button master`
