function readError(err, data) {
	if (err) {
		console.log(err);
	} else {
		return data
	}
}
module.exports.readError = readError;