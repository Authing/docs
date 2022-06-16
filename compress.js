const cluster = require("cluster");
const { cpus } = require("os");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const numCPUs = cpus().length;

function compress(file) {
  console.log(`Compressing ${file}`);
  // 需要先安装 https://pngquant.org/ 命令行工具
  execSync(`pngquant "${file}"`, { encoding: "utf-8" });
  const checkStats = execSync(`ls -l "${file}" | grep 'rwxr-xr-x'`, {
    encoding: "utf-8"
  });
  const statsOrigin = fs.statSync(file);
  const statsCompress = fs.statSync(file.replace(".png", "-fs8.png"));
  if (statsOrigin.size > statsCompress.size) {
    execSync(`rm -rf "${file}"`);
    execSync(`mv "${file.replace(".png", "-fs8.png")}" "${file}"`);
    if (checkStats.includes("rwxr-xr-x")) {
      execSync(`chmod 755 "${file}"`);
    }
  } else {
    execSync(`rm -rf "${file.replace(".png", "-fs8.png")}"`);
  }
  execSync("sleep 0.2");
}

if (cluster.isMaster) {
  execSync(
    'find . -name "*.png" -type f -size +500kb -not -path "./node_modules/*" -not -path "./docs/.vuepress/dist/*" -not -path "./.git/*" > temp.log'
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
    if (
      !file ||
      file.endsWith("/demo1-main.png") ||
      file.endsWith("-fs8.png")
    ) {
      return;
    }
    try {
      compress(file);
    } catch (e) {
      console.log(`Failed to compress ${file}`);
      execSync(`rm -rf "${file.replace(".png", "-fs8.png")}"`);
    }
  });
}
