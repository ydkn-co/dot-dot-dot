function readPackage(packageJson, context) {
  // Workaround for https://github.com/storybookjs/storybook/issues/16705
  if (packageJson.name === "@storybook/addon-docs") {
    context.log("Fixing the acorn dependency for @storybook/addon-docs");
    packageJson.dependencies.acorn = "^8.5.0";
  }

  return packageJson;
}
