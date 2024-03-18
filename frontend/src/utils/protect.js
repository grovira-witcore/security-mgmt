export function protect(fn, arg) {
  if (fn) {
    try {
      return fn(arg);
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }
  else {
    return null;
  }
}
