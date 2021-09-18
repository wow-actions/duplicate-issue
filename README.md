# Duplicate Issue

> Creates a full copy of issue with a single command.

Use the default `/duplicate` command to duplicate an issue:

![command](https://github.com/bubkoo/duplicate-issue/blob/master/screenshots/command.jpg?raw=true)

The duplicated issue:

![duplicated](https://github.com/bubkoo/duplicate-issue/blob/master/screenshots/duplicated.jpg?raw=true)

## Usage

Create `.github/workflows/duplicate-issue.yml` in the default branch:

```yml
name: Duplicate Issue
on:
  issue_comment:
    types: [created]
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: wow-actions/duplicate-issue@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Inputs

- `command` - The command name to copy the issue. Default `'duplicate'`.
- `who` - Who can duplicate the issue. Default `'author'` only the author of the issue can duplicate it. Or any other values indicate any one can duplicate the issue.
- `extras` - Additional information appended to the duplicated issue body. Default `'> This issue was copied from [#{{ issueNumber }}]({{ issueUrl }}) by @{{ author }}.'`.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
