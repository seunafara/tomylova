if (process.env.NODE_ENV == 'production') {
   module.exports = {
      mongoURL:
         'mongodb+srv://obavigo:1HN0BQ7fesaboyjd@cluster0.vh2vx.mongodb.net/tomylova?retryWrites=true&w=majority',
      secret: 'thebigsecret',
   };
} else {
   module.exports = {
      mongoURL: 'mongodb://localhost:27017/tomylova',
      secret: 'thebigsecret',
   };
}
