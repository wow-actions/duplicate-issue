import * as github from '@actions/github'

export namespace Util {
  export function isValidEvent(event: string, action?: string) {
    const { context } = github
    const { payload } = context
    if (event === context.eventName) {
      return action == null || action === payload.action
    }
    return false
  }

  // https://regex101.com/r/3PkLfT/1
  const TOKENISE_REGEX =
    /\S+="[^"\\]*(?:\\.[^"\\]*)*"|"[^"\\]*(?:\\.[^"\\]*)*"|\S+/g
  export function tokeniseCommand(command: string) {
    let matches
    const output: string[] = []
    // eslint-disable-next-line no-cond-assign
    while ((matches = TOKENISE_REGEX.exec(command))) {
      output.push(matches[0])
    }

    return {
      command: output[0],
      args: output.slice(1),
    }
  }
}
