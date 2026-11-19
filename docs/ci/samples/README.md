This folder is a teaching fixture for pull-request review practice.

The file planted-privacy-snippet.ts is not part of the TanStack app and must not be imported.
Do not wire it into a route, a page, or Supabase.
Contact values in the snippet are fake. They are not a real member.

## Files this pull request adds

Only these three paths:

- docs/ci/samples/planted-privacy-snippet.ts
- docs/ci/samples/sample-pr-body.md
- docs/ci/samples/README.md

No app routes, no Supabase files, and no change to .github/workflows/pr-ci.yml.

## Pull request record

- Pull request URL: REPLACE_WITH_YOUR_PULL_REQUEST_URL
- Status: open
- Merged: no

## CI record

- Workflow file: .github/workflows/pr-ci.yml
- Result: REPLACE_WITH_passed_OR_failed_OR_did_not_start
- Actions run URL: REPLACE_WITH_ACTIONS_RUN_URL_OR_checks_note

## Human learner note — do not paste this section into the AI review

One privacy mistake is planted in the snippet on purpose: the public share preview includes a member email and a member phone.
No sign-in, money, or product-intent mistake is planted.
Use this note later to judge whether an AI review found that mistake. Do not treat this note as approval to merge.
Diagram Zoom

100%
-
100%
+
No

Yes

No

Yes

Pull request opened

Existing pr-ci check

Commands passed

Person fixes the proposal

Review overlay

AI suggests findings only

Human judges four risks

Human approves

Human merges

The sample stays on an unmerged branch so CI can run without changing the main app.

✅
Assess Your Agent's Output

docs/ci/samples/planted-privacy-snippet.ts uses only fake contact data, including example@example.com and a fictional phone number that uses 555, and it contains no real person's email, phone, password, or API key.
In that snippet, a public share preview includes both a member email and a member phone. That is the one planted privacy mistake. The file does not also plant a sign-in bypass, a money bug, or a product-intent change, and it does not label the mistake in a comment as an answer key.
The snippet stands alone: it has no import of app routes, Supabase clients, or other project source files.
docs/ci/samples/README.md says in plain language that the snippet is not part of the TanStack app and must not be imported.
The README records a real pull-request URL beginning with https://github.com/, says the pull request is open and was not merged, and states that the pull request adds only docs/ci/samples/planted-privacy-snippet.ts, docs/ci/samples/sample-pr-body.md, and docs/ci/samples/README.md. Placeholder text such as REPLACE_WITH is gone.
The README records the result of the existing workflow file .github/workflows/pr-ci.yml as passed, failed, or did not start, and includes the Actions run link or a checks note. It does not claim a pass that the learner did not see.
docs/ci/samples/sample-pr-body.md is the pull-request description, says the change is a teaching sample that does not change the app, points at the existing roles and checklist docs without rewriting them, and does not approve the change or tell anyone to merge.
None of the three files contain workflow YAML, route code, Supabase SQL, or secrets, and none of them instruct an editor to import the snippet into the TanStack app.
Try It

$ Open the pull request URL recorded in docs/ci/samples/README.md and confirm the page says Open, not Merged.
$ Open Files changed and confirm the only paths are docs/ci/samples/planted-privacy-snippet.ts, docs/ci/samples/sample-pr-body.md, and docs/ci/samples/README.md.
$ On the pull request checks area or the Actions tab, confirm a run for the workflow file .github/workflows/pr-ci.yml was started by this pull request, then compare that result with the CI record in the README.
$ Open the snippet on the branch and point to the public preview fields that carry the member email and phone, and confirm the values are example@example.com and a 555 phone number.
$ Search the three sample files for the words import, supabase, and pr-ci.yml and confirm they only appear as warnings or as the CI record, not as app wiring or a workflow edit.
You'll know it worked when: You can hand the next step a real, unmerged pull-request URL whose diff is only the teaching fixture, plus a README that records that URL and the honest CI result, without any change to app routes, Supabase, or the workflow file.

If Create branch or Add file is missing, you may not have write access. Stop and ask a maintainer. Do not put the sample on the default branch just to finish faster. If Files changed shows app, Supabase, or workflow paths, remove those files from the sample branch with another commit. Do not merge a cleanup into the app. If no check appears after a refresh and a two-minute wait, confirm the pull request base is the default branch and record did not start. Do not edit .github/workflows/pr-ci.yml. If the check fails because the snippet has a syntax error, ask the agent to make the fixture valid TypeScript while keeping the email and phone on the public preview, commit that fix to the same branch, and record the new result. If the check fails for a reason already present on the default branch, record failed and leave the app alone. If you clicked Merge by mistake and the only files were the three sample docs, Production app behavior is still unchanged, but the exercise needed an open pull request: write that it was merged by mistake in the README, do not merge anything else, and do not delete the default branch to undo it. If a preview link appears, ignore it. It is not the Production URL, and this step does not ship a new version.

Key Points

A practice review needs a real pull-request diff, but the mistake stays in an unimported teaching fixture so the live app and Production site do not change.
The one planted mistake is a public share preview that includes a fake member email and phone. Extra bugs make the later review unclear.
The README must say the snippet is not part of the TanStack app and must not be imported, and it must record the real pull-request link and the real CI result.
The existing pr-ci workflow should run because you opened a pull request. Record the result. Do not edit the workflow, and do not merge.
Common Mistakes

Putting the privacy mistake in a real route or Supabase query instead of the unimported sample file.
Using a real person's email or phone, or planting several bugs instead of the one public-preview leak.
Labeling the bug in the TypeScript comments or in the pull-request description so a later AI review can copy the answer.
Merging the pull request, committing the sample straight to the default branch, or editing .github/workflows/pr-ci.yml to force a green check.
Leaving REPLACE_WITH placeholders in the README, or recording a pass when the check failed or never started.
✗ Commit did not pass

Commit docs/ci/samples/planted-privacy-snippet.ts, docs/ci/samples/sample-pr-body.md, and docs/ci/samples/README.md on the open pull-request branch docs/sample-planted-privacy (do not merge), with the README recording the pull-request URL and the pr-ci result. PAUL will verify it implements Open a sample pull request with one planted privacy mistake.

Last commit checked: 1d81869 "21"

Found docs/ci/samples/planted-privacy-snippet.ts, docs/ci/samples/sample-pr-body.md, but this step also needs docs/ci/samples/README.md. Commit and push the missing file, then check again.

Check my commit
Step 9 of 15

Open a sample pull request with one planted privacy mistake


← Previous
Step 8: Write the review orchestration runbook

Push code to continue
You can move to the next step once you've committed and pushed your changes (Commit docs/ci/samples/planted-privacy-snippet.ts, docs/ci/samples/sample-pr-body.md, and docs/ci/samples/README.md on the open pull-request branch docs/sample-planted-privacy (do not merge), with the README recording the pull-request URL and the pr-ci result.). PAUL will check the most recent commit on your default branch and verify it implements the concept this step is teaching.
