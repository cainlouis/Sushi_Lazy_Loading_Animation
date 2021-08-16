# JavaScript 520 Course Materials

You can either clone this repo or browse it via the GitLab web interface to look 
at lecture notes, examples, exercises, etc.

The content is organized by week, so a file that starts with 02
belongs to Week 2.

Most of this content is also published as a plain web site at 
https://dawsoncollege.gitlab.io/520JS/2021-08/520-study

## Working on exercises and assignments

You will receive specific instructions for how to submit assignments for grading.

To be able to push _ungraded_ exercise solutions to GitLab (e.g. to have your 
teacher look at your solution or to pratice using git workflows), you can 
[fork](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow) 
this repository and push to your fork.

The __Academic Integrity__ policy for this course requires students to
__keep all their work private__ (that is, student must not share their work with 
others) unless explicity authorized by their teacher. For example, in the case of
a team project your teacher will instruct you to share code with your teammates.

## Found a mistake?

Report the mistake by [creating a new issue][new-issue] on this repository!
That way other students know about it, teachers know about it, and everyone knows 
when the mistake has been fixed.

Try to be precise: link to a specific line in a specific file like
"There's a word missing at `https://gitlab.com/url/to/project/master/README.md#L1-L2`"

[new-issue]: https://docs.gitlab.com/ce/user/project/issues/create_new_issue.html#new-issue-from-the-project-39-s-dashboard

## Resources

Your main resource aside from course notes is 
[MDN Web Docs](https://developer.mozilla.org/en-US/) -- it provides
core documentation about JS/HTML/CSS features and web standards that are 
relevant to all major browsers.

## For Teachers

In general __there is no need to edit the files in this repository directly__:
the content for students is mirrored automatically from the 520 _teachers'_ repo.

One thing you do need to edit directly is this __README__ :)

If you do need to make changes, be aware that some features won't work locally 
unless you `git clone <url> --recursive` to get the included `markdown-tools` 
[submodule](https://faun.pub/git-submodule-cheatsheet-29a3bfe443c3). 

There is a CI job that updates this repo's GitLab pages with the latest changes
based on what is listed in `.pubhtml_manifest`. 

_Note that `.pubhtml_manifest` also automatically mirrored_ from the teachers'
repo, so you should not edit it here.
