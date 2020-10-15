import * as core from '@actions/core'
import * as github from '@actions/github'
import { Util } from './util'

export namespace Action {
  export async function run() {
    try {
      const context = github.context
      const issue = context.payload.issue
      const comment = context.payload.comment

      if (
        !Util.isValidEvent('issue_comment', 'created') ||
        !issue ||
        !comment
      ) {
        core.warning('This action is only supposed on issue comment created.')
        return
      }

      const commentBody = comment.body as string
      const firstLine = commentBody.split(/\r?\n/)[0].trim()
      // Check if the first line of the comment is a slash command
      if (firstLine.length < 2 || firstLine.charAt(0) !== '/') {
        core.debug(
          'The first line of the comment is not a valid slash command.',
        )
        return
      }

      const { command } = Util.tokeniseCommand(firstLine.slice(1))
      if (command !== core.getInput('command')) {
        return
      }

      if (
        core.getInput('who') === 'author' &&
        issue.user.login !== comment.user.login
      ) {
        core.info(`Denied, ${comment.user.login} is not the issue owner.`)
        return
      }

      const issueCopy = {
        ...context.repo,
        title: issue.title,
        body: `${issue.body}\n\n> Copy of [#${issue.number}](${issue.html_url})`,
        milestone: issue.milestone ? issue.milestone.number : null,
        labels: issue.labels,
      }

      if (issueCopy.milestone === null) {
        delete issueCopy.milestone
      }

      const octokit = Util.getOctokit()
      await octokit.issues.create(issueCopy)
    } catch (e) {
      core.error(e)
      core.setFailed(e.message)
    }
  }
}
