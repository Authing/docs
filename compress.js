const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
execSync(
  'find . -name "*.png" -type f -size +1M -not -path "./node_modules/*" -not -path "./docs/.vuepress/dist/*" -not -path "./.git/*" > temp.log'
);
const files = fs.readFileSync("./temp.log", { encoding: "utf-8" }).split("\n");

files.forEach(file => {
  if (!file) {
    return;
  }
  console.log(`Compressing ${file}`);
  // 需要先安装 https://pngquant.org/ 命令行工具
  execSync(`pngquant ${file}`, { encoding: "utf-8" });
  execSync(`rm -rf ${file}`);
  execSync(`mv ${file.replace(".png", "-fs8.png")} ${file}`);
});
