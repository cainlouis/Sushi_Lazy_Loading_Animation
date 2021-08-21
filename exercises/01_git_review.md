---
title:  'Exercise 1.1 - Working with git in this course'
author:
- Maja Frydrychowicz, Jaya Nilakantan
- 420-520-DW
---

[^keywords]: Concepts: GitLab, config, fork, remote, upstream/origin, clone, pull, push, branch, protected branch, git review resources

_Goal: Add the course's git repository to your H:drive and review basic git commands._[^keywords]

This tutorial explains:

* how to configure your workspace to use `git` for this course,
* how you will submit graded work throughout the semester.

__Read the entire document carefully__

# Set up git and GitLab

1.  Set up a GitLab account if you haven't already and send your username to your
    teacher (_follow the instructions/links on Moodle, Week 1_).

⚠️ __Practice using git at the command-line__: Although IDEs can provide a GUI
for interacting with `git`, a professional developer should know how to use `git`
at the command-line. We will encourage command-line use throughout the course
to get you ready for your internship.

2.  Configure `git` on your Dawson H: drive and/or your personal computer. 
    Using a terminal like _git-bash_:

    ```
    $ git config --global user.name "Grace Hopper"
    $ git config --global user.email "gracie@ilovelinux.ca"
    $ git config --global color.ui "auto"
    ```

    * If you need to install git on your personal computer later on, follow the 
      instructions
      at <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git> and use 
      all the default options.

3.  It's also a good idea to [set up an SSH key for GitLab](https://gitlab.com/-/profile/keys) 
    for when you push/pull. Save your SSH passphrase (and all your other passwords for that matter)
    in a [password manager, like Bitwarden](https://bitwarden.com/)

If you don't remember how to use git, start by doing this [git basics tutorial](https://gitlab.com/dawsoncollege/520JS/2021-08/all/git-tutorials/-/blob/master/01_basics.md).

## Set up the 520-study repository

Your teacher will add you as a member to a repository called __520-study__.
This is where you will get most course materials.

### Overview

You will work in a __fork__ of `520-study`. Recall that a fork is a copy of a
repository. When you __clone__ your fork, you have a local copy that is
connected to the two remote copies. Here is a diagram of this relationship:

![A local copy with two remotes on the GitLab server: origin and upstream](assets/git-fork-origin-upstream.png){ width=100% }

Each week, you will _pull_ from the  __remote called "upstream"__ 
(the teachers' `520-study`) to get access to the latest exercises in your 
__local clone__. To keep your fork up-to-date you will 
_push_ to the __remote called "origin"__. 

### Instructions

1.  Go to <https://gitlab.com/dawsoncollege/520JS/2021-08/520-study> and click __Fork__

    * Change the name of your fork to `520-study-LASTNAME`, where `LASTNAME` is your last name.
      (See screenshot)
    * The namespace should be your personal account (the default)
    * The visibility will be __private__ because the original `520-study` repo
      is private.

![Name your fork 520-study-LASTNAME](assets/gitlab-fork-screenshot.png){ width=100% }

⚠️ __Academic Integrity__: Sharing your fork with other students or making a 
public copy would be considered _cheating_, since your fork will contain your
solutions to individual graded work.

2. Next, click on __Project Information__ on the left, then __Members__ 

   You need to add the 520 teachers as Maintainers so we have access to
   your private copy. _This is how we will grade your individual assignments._

  * Add `j-nila` and `mfrydr` with role __Maintainer__ and click __Invite__

![Add teachers as Maintainers](assets/gitlab-members-screenshot.png){ width=100% }

3.  Now you will __clone your fork__. Using a terminal like _git-bash_, 
    go to your H:drive (`cd /h`)

    * Create a directory for 520
    * Inside that directory run 
    
      ```
      git clone <url-to-520-study-LASTNAME.git>
      ```

      You can get the URL by visiting your fork on gitlab.com and clicking the
      __Clone__ button. (Choose the __SSH__ option if you have an SSH key set
      up for GitLab.)

Once that's done you should be able to `cd` into `520-study-LASTNAME`. This is 
your __local__ copy. 

The default branch is `main`. 

⚠️ __Never commit directly to the main branch!__

```
$ cd 520-study-LASTNAME
$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

By default your clone has just one remote, `origin`, which points to your
_fork on GitLab_.

```
$ git remote -v
origin  git@gitlab.com:impossibus/520-study-my-last-name.git (fetch)
origin  git@gitlab.com:impossibus/520-study-my-last-name.git (push)
```

When you need to push commits to the GitLab server (e.g. to submit an assignment
solution), you will __push to a branch on origin__.

4.  Configure a new remote called `upstream` to point to the teachers' copy of
    `520-study`. This will allow you to pull in updates from your teacher.

    * Go to <https://gitlab.com/dawsoncollege/520JS/2021-08/520-study> and copy
      the __Clone__ URL.
    * Then paste the URL into the following command on the terminal

    ```
    $ git remote add upstream git@gitlab.com:dawsoncollege/520JS/2021-08/520-study.git
    ```

5.  Verify that you have two remotes now: `origin` and `upstream`

    ```
    $ git remote -v
    origin  git@gitlab.com:impossibus/520-study-my-last-name.git (fetch)
    origin  git@gitlab.com:impossibus/520-study-my-last-name.git (push)
    upstream        git@gitlab.com:dawsoncollege/520JS/2021-08/520-study.git (fetch)
    upstream        git@gitlab.com:dawsoncollege/520JS/2021-08/520-study.git (push)
    ```

# How to sync your fork of 520-study

Now whenever you need to get the latest changes from your teachers' repo,
you:

* checkout the `main` branch, 
* `pull` from `upstream`, 
* and `push` to origin.

```
$ git checkout main
Already on 'main'
Your branch is up to date with 'origin/main'.
```

You should aim to always keep your local `main` branch in sync with the `main`
branch on `upstream`.

```
$ git pull upstream main
From gitlab.com:dawsoncollege/520JS/2021-08/520-study
* branch            main       -> FETCH_HEAD
Already up to date.
```

Similarly, remember to keep your `main` branch on `origin` in sync 
with the `main` branch on `upstream`.

```
$ git push origin main
Everything up-to-date
```

# Protected Branch Workflow

Throughout the semester, you are expected to use the __Protected Branch Workflow__
for both graded and ungraded work, whether it's done individually or in a team.

In short, __never commit to the `main` branch -- it is protected!__
Always work on a __feature branch__ then merge your changes into `main`
when you (and your teammates, if any) are happy with the work. 

* When working individually, you usually merge your feature branch at the command-line.
* When working in a team, you push your feature branch to the remote repo and use
  it to open a __Merge Request__ in the GitLab Web UI.

Next week, when Assignment 1 is released, we will review the 
[Protected Branch Workflow]([Protected Branch Workflow](https://gitlab.com/dawsoncollege/520JS/2021-08/all/git-tutorials/-/blob/master/protected_branch_workflow.md)) 
in more detail, but you can read about it early if you like.

# Git Review

If you don't remember how to use git, start by doing this [git basics tutorial](https://gitlab.com/dawsoncollege/520JS/2021-08/all/git-tutorials/-/blob/master/01_basics.md).

If you need to review how to use branches, see the following:

1. [A tutorial about git branches](https://gitlab.com/dawsoncollege/520JS/2021-08/all/git-tutorials/-/blob/master/02_mistakes_branches.md)

2. [A tutorial about collabration in git](https://gitlab.com/dawsoncollege/520JS/2021-08/all/git-tutorials/-/blob/master/03_collaboration.md)