const cluster = require("cluster");
const { cpus } = require("os");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const numCPUs = 1; //cpus().length;

function compress(file, index) {
  console.log(`${index}: Compressing ${file}`);
  const statsOrigin = fs.statSync(file);

  // 需要先安装 https://pngquant.org/ 命令行工具
  execSync(`cp "${file}" "${file}.bak"`, { encoding: "utf-8" });
  // execSync(`sips --resampleWidth 1920 "${file}"`, { encoding: "utf-8" });
  execSync(`pngquant "${file}"`, { encoding: "utf-8" });

  const statsCompress = fs.statSync(file.replace(".png", "-fs8.png"));
  if (statsOrigin.size > statsCompress.size) {
    execSync(`rm -rf "${file}"`);
    execSync(`mv "${file.replace(".png", "-fs8.png")}" "${file}"`);
    execSync(`chmod 755 "${file}"`);
    execSync(`rm -rf "${file}.bak"`);
  } else {
    execSync(`rm -rf "${file.replace(".png", "-fs8.png")}"`);
    execSync(`rm -rf "${file}"`);
    execSync(`mv "${file}.bak" "${file}"`);
  }
  execSync("sleep 0.2");
}

if (cluster.isMaster) {
  execSync(
    'find ./docs -name "*.png" -type f -size +100kb -not -path "./node_modules/*" -not -path "./docs/.vuepress/dist/*" -not -path "./.git/*" > temp.log'
  );
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
} else {
  const files = fs
    .readFileSync("./temp.log", { encoding: "utf-8" })
    .split("\n");

  files.forEach((file, i) => {
    if ((i % numCPUs) + 1 !== +cluster.worker.id) {
      return;
    }
    if (!file || file.endsWith("-fs8.png")) {
      return;
    }
    try {
      compress(file, i);
    } catch (e) {
      console.error(e);
      console.log(`Failed to compress ${file}`);
      execSync(`rm -rf "${file.replace(".png", "-fs8.png")}"`);
    }
  });
}
