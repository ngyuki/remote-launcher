# remote-launcher

## remote configuration

```
vim ~/.remote-launcher
```

```
module.exports = {
    'host': '192.168.0.123',
    'map': [
        { pattern: '^/home/your/Dropbox(/|$)',  replace: 'C:\\Users\\your\\Dropbox$1' },
        { pattern: '^/home/your/devel(/|$)',    replace: 'C:\\Users\\your\\devel$1' },
        { pattern: '^/home/your/download(/|$)', replace: 'C:\\Users\\your\\download$1' },
        { pattern: '^/home/your(/|$)',          replace: '\\\\linux-server\\your$1' },
    ]
}
```
