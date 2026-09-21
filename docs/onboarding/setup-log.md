# PREIshare setup log

**Learner:** Jade Jenson
**Date:** 2026-09-17
**OS:** macOS
**Team repo (upstream):** https://github.com/EdTechForLearning/PREIShare-org-repo
**Orientation notes used:** `docs/onboarding/team-orientation-notes.md`

## Required setup checks

| Check | Result | Verified value |
| --- | --- | --- |
| `git --version` | PASS | `git version 2.33.0` |
| `git config user.name` | PASS | `jadiennejenson` |
| `git config user.email` | PASS | `10935974@uvu.edu` |
| Clone path | PASS | `/Users/jade/PREIShare-org-repo1` |
| `origin` points to my fork | PASS | `https://github.com/jadiennejenson/PREIShare-org-repo1.git` |
| `upstream` points to the team repo | PASS | `https://github.com/EdTechForLearning/PREIShare-org-repo.git` |
| Required setup facts verified | PASS | All checks above match this checkout |

## 1. Accounts and fork

| Check | Result | Notes |
| --- | --- | --- |
| GitHub sign-in works | PASS | Account username: jadiennejenson |
| Can view team repo https://github.com/EdTechForLearning/PREIShare-org-repo | PASS | |
| Fork created in my account | PASS | My fork URL: https://github.com/jadiennejenson/PREIShare-org-repo1 |

## 2. Git install and identity

```text
git version 2.33.0

jadiennejenson
10935974@uvu.edu
```

Identity configured: PASS

## 3. Clone (of MY fork)

- Parent directory used: `/Users/jade`
- Clone command used: `git clone https://github.com/jadiennejenson/PREIShare-org-repo1.git`
- Cloned my fork (not the team repo): PASS
- Clone completed without error: PASS
- Local project path: `/Users/jade/PREIShare-org-repo1`

## 4. Remotes (run inside the repo)

- `git remote add upstream https://github.com/EdTechForLearning/PREIShare-org-repo.git` run: PASS

### git remote -v

```text
origin  https://github.com/jadiennejenson/PREIShare-org-repo1.git (fetch)
origin  https://github.com/jadiennejenson/PREIShare-org-repo1.git (push)
upstream  https://github.com/EdTechForLearning/PREIShare-org-repo.git (fetch)
upstream  https://github.com/EdTechForLearning/PREIShare-org-repo.git (push)
```

origin points at MY fork: PASS
upstream points at the team repo: PASS

## 5. Post-clone verification

### git status

```text
 M docs/onboarding/setup-log.md
```

### Default branch

```text
main
```

Default branch name: `main`
Working tree clean after clone: FAIL (the setup log was edited after cloning)

## 6. Auth notes (no secrets)

- Clone method: HTTPS
- Auth method used (if prompted): browser / credential helper / SSH key / other
- Auth succeeded: PASS
- **Do not paste tokens or private keys here**

## 7. Issues and fixes

| Issue | What I tried | Outcome |
| --- | --- | --- |
| Clone command used the fork name without the `1` suffix | Updated the setup log to use `PREIShare-org-repo1` consistently | Resolved |

## 8. Ready for next step

I have a fork I own, a local clone of it with origin and upstream set, and a setup log another teammate could audit: YES