import reset from './reset.js';
import app from './express_app.js';
import http from 'node:http';
import process from 'node:process';

const PORT = 3000;

if (process.argv.length >= 3) {
  // コマンドライン引数として'reset'が指定された場合
  if (process.argv[2] === 'reset') {
    console.log('Preparing Database Data.');
    // データ準備のスクリプト実行
    reset();
  } else {
    console.error('Bad Command Line Argument.');
    process.exit(1);
  }
} else {
  // コマンドライン引数になにも指定されない場合は
  // WebAPI(Expressアプリケーション)の起動

  app.set('port', PORT);

  const server = http.createServer(app);
  server.listen(PORT);
  server.on('error', onError);
  server.on('listening', function(){
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  });
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      console.error(PORT + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(PORT + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
