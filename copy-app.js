const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname + '/app');
const buildDir = path.join(__dirname + '/build');

const copyDir = (src, dist, callback) => {
  fs.access(dist, function(err){
    if(err){
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if(err){
      callback(err);
    } else {
      fs.readdir(src, function(err, paths) {
        if(err){
          callback(err)
        } else {
          paths.forEach(function(file) {
            let _src = path.join(src, file);            
            let _dist = path.join(dist, file);

            fs.stat(_src, function(err, stat) {
              if(err){
                callback(err);
              } else {
                // 判断是文件还是目录
                if(stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if(stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}

copyDir(appDir, buildDir + '/app', function(err){
  if(err){
    console.log(err);
  }
});