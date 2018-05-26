let http = require('http');
let fs = require('fs');
let url = require('url');
let sliders = require('./sliders');
let path = require('path');


function read(cb){
  fs.readFile(path.resolve('./mock/book.json'),'utf8',function(err,data){
    if(err || data.length == 0){
      cb([]);
    }
    else{
      cb(JSON.parse(data));
    }
  })
}
function write(data,cb){
  fs.writeFile(path.resolve('./mock/book.json'),JSON.stringify(data),cb);
}
http.createServer((req,res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS")
    return res.end();/*让options请求快速返回*/

  let {pathname,query} = url.parse(req.url,true);
  if(pathname === '/sliders'){
    res.setHeader('Content-Type','application/json;charset=utf8');
    return res.end(JSON.stringify(sliders))
  }
  if(pathname === '/hot'){
    read(function (books) {
      let hot = books.reverse().slice(0,6);
      return res.end(JSON.stringify(hot));
    })
    return;
  }
  if(pathname === '/book'){
    let id = parseInt(query.id);
    console.log(req.method)
    switch (req.method){
      case 'GET':
        if(id){ //获取一本书
          read(function(books){
            let book = books.find((item)=>item.bookId === id);
            if(!book) book = {};
            return res.end(JSON.stringify(book));
          })
        }
        else{ //获取所有图书
          read(function (books) {
            res.setHeader('Content-Type','application/json;charset=utf8');
            return res.end(JSON.stringify(books.reverse()));
          })
        }
        break;
      case 'DELETE':
        read(function (books) {
          books = books.filter(book=>book.bookId!=id);
          write(books,function () {
            res.end(JSON.stringify({}));
          })
        })
        break;
      case 'PUT':
        let str = '';
        req.on('data',chunk=>{
          str += chunk;
        })
        req.on('end',()=>{
          let book = JSON.parse(str);
          read(function (books) {
            books = books.map(item => {
              if(item.bookId == id){
                return book;
              }
              return item;
            })
            write(books,()=>{
              res.end(JSON.stringify(book));
            })
          })
        })
        break;
    }
    return;
  }
}).listen(3000)
