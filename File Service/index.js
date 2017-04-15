var express = require("express");
var formidable = require("formidable");
var handlebars = require("express3-handlebars")
                    .create({
                       defaultLayout: 'main' 
                    });
var cookieParser = require("cookie-parser");
var session = require("express-session");

var app = express();
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.use(cookieParser());
app.use(session({
    secret: 'Some secret'
}))

app.get("/",(request,response) => {
    response.render("fileInput");
});

app.get("/get-file-size",(request,response) => {
    response.render("fileOutput",{
        size: request.session.fileSize
    });
});

app.post("/get-file-size",(request,response) => {
    var form = new formidable.IncomingForm();
    form.parse(request,(err,fields,files) => {
        if(err) console.log(err.stack);
        request.session.fileSize = Math.ceil(files.file.size/1024);
        response.redirect(303,"/get-file-size");
    });
});

app.listen(3000);