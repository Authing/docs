#! /bin/bash

rm -rf temp
git clone https://github.com/Hard-it-le/authing-docs-factory.git --branch temp/dist --depth 1 temp
rm -rf temp/.nojekyll
rm -rf temp/sidebar.json
cp -R temp/* ./docs/reference-new/sdk-v5/
