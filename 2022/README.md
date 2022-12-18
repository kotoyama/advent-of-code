# Getting started

First of all, install all the required dependencies.

You may need to execute the following to grant yourself permissions to run bash scripts:

```bash
chmod +x scripts/init.sh
chmod +x scripts/run.sh
```

Run `pnpm init:day {YOUR_DAY}`. This command will create a new directory in the `src` folder with the following content:

- `index.ts` — the main file with your solution
- `index.txt` — the text file with the problem input
- `test.txt` — the text file with test input
- `index.test.ts` — the test file
- `README.md` — the problem description

You need to fill in the `README.md` and text files yourself: puzzle input and test input.

In the `index.ts` file, type the `newday` code snippet shortcut to create a new day boilerplate. Then run `pnpm run:day {YOUR_DAY}` to run your solution.

In the `index.test.ts` file, type the `newdaytest` code snippet shortcut to create a test file boilerplate. To test your solution, run `pnpm vitest`. Don't forget to run your solution first, otherwise your TypeScript code won't be compiled.

Happy coding!
