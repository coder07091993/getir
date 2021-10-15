const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");

const testRouter = require("./routes/test");

const app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());


app.use("/test", testRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	// Sending Error response
	res.status(err.status || 500);
	res.jsonp({
		error: err,
		code: err.status || 500,
		msg: err.message || "Internal Error occurred",
	});
	next();
});

module.exports = app;
