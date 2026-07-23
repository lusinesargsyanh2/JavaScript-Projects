# call, apply, and bind

Custom implementations of JavaScript's `Function.prototype.call`, `Function.prototype.apply`, and `Function.prototype.bind`.

## Methods

- **`myCall(context, ...args)`**
  - Invokes the function immediately.
  - Sets the value of `this`.
  - Accepts arguments individually.

- **`myApply(context, argsArray)`**
  - Invokes the function immediately.
  - Sets the value of `this`.
  - Accepts arguments as an array.

- **`myBind(context, ...args)`**
  - Returns a new function.
  - Sets the value of `this`.
  - Supports partial application by pre-setting arguments.
  - Executes only when the returned function is called.