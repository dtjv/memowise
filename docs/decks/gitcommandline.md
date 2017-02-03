# Git Command Line

## Card 
### Question
How do you create a local repo?
### Answer
`git init`
### Explanation
Creates an empty Git repository or reinitialize an existing one

---

## Card
### Question
How do you check changed files in your working directory?
### Answer
`git status`
### Explanation
Shows the working tree status

---

## Card 
### Question
How do you delete a local branch?
### Answer
`git branch -d <branchname>`
### Explanation
With a -d or -D option, `<branchname>` will be deleted. You may specify more than one branch for deletion. If the branch currently has a reflog then the reflog will also be deleted.

---

## Card 
### Question
How do you show all commits, starting with the newest
### Answer
`git log`
### Explanation
Shows commit logs

---

## Card 
### Question
How do you add all current changes to the next commit
### Answer
`git add .`
### Explanation
Stages all changed files for commit

---

## Card 
### Question
How do you list all currently configured remotes?
### Answer
`git remote -v`
### Explanation
Shows a list of existing remotes. Be a little more verbose and show remote url after name. **NOTE**: This must be placed between remote and subcommand.

---
