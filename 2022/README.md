## Getting started

First of all, install all the required dependencies.

You may need to execute the following to grant yourself permissions to run bash scripts:

```bash
chmod +x scripts/init.sh
chmod +x scripts/run.sh
```

Run `pnpm init:day {YOUR_DAY}`. This command will create a new directory in the `src` folder with the following content:

- `index.ts` — the main file with your solution
- `index.txt` — the text file with the problem input
- `README.md` — the problem description

You need to fill in the `README.md` and the problem input file yourself.

In the `index.ts` file, type the `newday` code snippet shortcut to create a new day boilerplate.

Finally, run `pnpm run:day {YOUR_DAY}` to run your solution.

Happy coding!
