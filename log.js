
var vname = "vnameman"

function log(msg){
console.log(msg)
console.log(__filename)//TODO get the curentfilename
console.log(__dirname)//TODO get teh currentdirename
}

//module.exports.fname = log
module.exports = log
