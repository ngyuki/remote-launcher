# メモ

## bash へのシグナル

msys の bash に対して `proc.kill('SIGTERM')` しても強制終了になるだけで実際のシグナルは受け取らない。

```js
var spawn = require('child_process').spawn;
var proc = spawn('bash', ['-c', 'trap uname EXIT; while :; do sleep 1; done']);
proc.stdout.on('data', function(data){
    console.log(data.toString());
});
setTimeout(function(){
    proc.kill('SIGTERM');
}, 1000);
```

pid に対して bash で kill すればシグナルとして送信される。

```js
var spawn = require('child_process').spawn;
var proc = spawn('bash', ['-c', 'trap uname EXIT; while :; do sleep 1; done']);
proc.stdout.on('data', function(data){
    console.log(data.toString());
});
setTimeout(function(){
    spawn('bash', ['-c', 'kill -TERM "$1"', '--', proc.pid]);
}, 1000);
```

## child_process.spawn の pid

temoto.js が bash から起動していない場合（cmd.exe とかから起動した場合）、下記のように bash スクリプトを起動すると、呼び出し元と呼び出し先で pid が異なる。

```js
var spawn = require('child_process').spawn;
var proc = spawn('bash', ['-c', 'echo $$']);
console.log(proc.pid);
proc.stdout.on('data', function(data){
    console.log(data.toString());
});
```

*cmd.exe*

```
node sample.js
# 7300
# 9752
```

*bash*

```
node sample.js
# 9572
# 9572
```

そのため、cmd.exe から起動した場合だと `proc.pid` に kill しても bash プロセスまで伝わらない。

