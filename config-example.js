module.exports = {

    allowHosts: [
        '192.168.1.234/32',
    ],

    replacePaths: [
        { pattern: '^/home/your/Dropbox(/|$)',  replace: 'C:\\Users\\your\\Dropbox$1' },
        { pattern: '^/home/your/devel(/|$)',    replace: 'C:\\Users\\your\\devel$1' },
        { pattern: '^/home/your/download(/|$)', replace: 'C:\\Users\\your\\download$1' },
        { pattern: '^/home/your(/|$)',          replace: '\\\\linux-server\\your$1' },
    ],
}
