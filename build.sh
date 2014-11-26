r.js -o app/build/app.build.js
cd dist
mv public/vendor/requirejs/require.js require.js
rm -rf public/vendor build build.txt .bowerrc bower.json package.json
mkdir public/vendor
mkdir public/vendor/requirejs
mv require.js public/vendor/requirejs/require.js
mv css/style.css style.css && rm -rf css/* && mv style.css css/style.css