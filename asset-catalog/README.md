# Asset Catalog

This assignment will simulate the various tasks around storing *assets* in a distributed system.
For all intents and purposes, the *assets* mentioned above could be of any type: audio, images, videos, text-data, binary-data, etc.
The goal of the assignment is to upload *assets* from any number of *remote clients* to a *centralized server* for persistent storage. The server is responsible for the storage of the actual data that represents the *asset*, as well as the metadata that describes the data.

## Rules

- You are free to use any language of your choice for this project *(you can also use more than 1 if needed)*.
- You must follow all conventions and best-practices learned in the previous assignments.
- You are to work alone.
- Separate your code into different packages/services based on their responsibility.
- Use OOP principles.
- Use automated testing to verify functionality *(TDD is preferred, but not required)*.
- You are to create a PR *(there is no need to create an issue)* with your solution in a sub-directory of the root.
- You are to self-assign 2 reviewers to your PR *(make sure to mark the PR as draft when it is still a work in progress)*.

## Task

### Client

1. The client will run as a CLI tool on a remote machine, *(more than 1 client can be active at any given time).
2. The client will *watch* a directory for file changes and upload the changed files to the remote server.
3. The client will not change or move the files from the *watched* directory at any point.
4. No file can be uploaded twice *(even when multiple clients are running)*.
5. The client must be able to recover state from a previous execution.
6. You can store client-specific data in fixed directories based on Linux conventions:
    - A single directory where user data is stored, defaulting to `~/.local/share`.
    - A single directory where configuration is stored, defaulting to `~/.config`.
    - A single directory which holds non-essential data files, defaulting to `~/.cache`.

### Centralized Server

For now, you can simulate the remote server by creating a simple `http` catch-all server. The next part of the assignment will focus on the development of the server.
