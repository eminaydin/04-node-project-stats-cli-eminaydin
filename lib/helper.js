const helpText = `
is-project: usage: is-project [dir]

options:
--help        prints out this usage guide
--debug       to see error messages
`;

const dependencyList = (dependencyObj = {}) => {
  const keys = Object.keys(dependencyObj);
  return keys.map((dep) => `  - ${dep}`).join("\n\r");
};

const gitOutput = ({ url } = {}) => {
  let output = `is git repo:     ${!!url} \n\r`;
  if (url)
    output += `remote repo${url.length > 1 ? "s" : ""}:     
${url.map((url) => `- ${url}`).join("\n")}`;
  return output;
};

const output = ({ projectInfo: p, gitInfo }) => {
  return `Project Name:    ${p.name}
Version:         ${p.version}
Dependencies:
${dependencyList(p.dependencies)}
devDependencies:
${dependencyList(p.devDependencies)}

${gitOutput(gitInfo)}`;
};

module.exports = {
  helpText,
  dependencyList,
  output
};
