# abstract/text-input

## subtree

### pull/push

```bash
# Push
git subtree push --prefix=src/abstract/text-input a-text-input master
# Pull
git subtree pull --prefix=src/abstract/text-input a-text-input master
# Force
git push a-text-input `git subtree split --prefix=src/abstract/text-input @`:master --force
```

test

### diff

```
git --no-pager diff a-text-input/master master:src/abstract/text-input
```

### Add to your project

1. Add a repository alias `git remote add a-text-input git@github.com:sashulinator/a-text-input.git`
2. To check a list of aliases `git remote -v`, you must see `a-text-input`
3. Check that your project has no changes
4. run `git subtree add --prefix=src/abstract/text-input a-text-input master`
