# Duplicate Issue

A GitHub Action to create a full copy of issue with a single command.

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
      - uses: bubkoo/duplicate-issue@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Inputs

- `command` - The command name to copy the issue. Default `'duplicate'`.
- `who` - Who can duplicate the issue. Default `'author'` only the author of the issue can duplicate it. Or any other values indicate any one can duplicate the issue.

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
