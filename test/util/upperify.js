/*eslint no-process-exit:0*/
var through = require("through");

var toUpperCase = module.exports = function toUpperCase() {
  var buffer = new Buffer(0);
  return through(
    function write(data) {
      if (typeof data === "string") {
        data = new Buffer(data);
      }
      buffer = Buffer.concat([buffer, data]);
    },
    function end() {
      if (buffer.length > 0) {
        this.queue(buffer.toString().toUpperCase());
      }
      this.queue(null);
    }
  );
};

if (require.main === module) {
  process.stdin.pipe(toUpperCase()).pipe(process.stdout);
}
