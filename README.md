### Usage
In the build directory run:

```bash
python -m http.server
```

This requires Python 3, and will start a local simple HTTP server serving the
content of that directory. The build expects the port is 8000. If that is not
the case, you will have to download `yarn` (or `create-react-app`, which
include `yarn`) and run `yarn build` in the toplevel repository directory. To
change the port update the `homepage` field in package.json.

To update the schedule that is displayed, alter the contents of sg14.js or
cppcon2018.js.

All logic is in `App.js`. All dependencies can be install using `yarn` or
`npm`.
