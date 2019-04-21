exports.deepIssue = mod => {
  if (mod.issuer) {
    return deepIssue(mod.issuer);
  }
  if (mod.name) {
    return mod.name;
  }
  return false;
};
