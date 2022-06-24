/**
 * 检查英文文档修改中，未使用的图片并删除
 */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const DIR = "./docs/en";

execSync(
  `find ${DIR} -type f \\( -iname \\*.jpg -o -iname \\*.png -o -iname \\*.gif \\) -not -path "./.vuepress/*" -not -path "./.git/*" > temp.log`,
  { encoding: "utf-8" }
);
const files = fs.readFileSync("./temp.log", { encoding: "utf-8" }).split("\n");

files.forEach(file => {
  if (!file) {
    return;
  }
  // console.log(`Check ${file}`);
  const filename = file.split("/").pop();

  try {
    execSync(`grep -R "/${filename}" ${DIR}`, {
      encoding: "utf-8"
    });
  } catch (e) {
    console.log(file);
    // execSync(`rm -rf ${file}`, {
    //   encoding: "utf-8"
    // });
  }
});
