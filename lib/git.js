const path = require("path");
const fs = require("fs").promises;

// It would be fine to use something like https://www.npmjs.com/package/ini
const gitRemoteUrlFromConfig = (fileContent) => {
  const sections = fileContent.split("\n");
  const urls = sections
    .filter((row) => row.includes("\turl = "))
    .map((urlRow) => {
      const urlStart = urlRow.indexOf("git");
      return urlRow.slice(urlStart);
    });
  return urls;
};

module.exports = async (folder) => {
  const gitInfo = {};
  const file = path.join(folder, ".git", "config");

  try {
    await fs.access(file);
    const fileContent = await fs.readFile(file, "utf-8");
    gitInfo.url = gitRemoteUrlFromConfig(fileContent);
  } catch {}

  return gitInfo;
};
