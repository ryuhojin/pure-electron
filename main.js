const { app, BrowserWindow } = require('electron');
const http = require('http');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('index.html')
    console.log("ELECTRON APP RUNNING ON 3000")

}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Content-Type', 'application/json');

    if (req.url == '/api/recieveToken') {
        const token = { token: "SampleToken" };
        res.end(JSON.stringify(token));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: '404 Not Found' }))
    }

})

server.listen(8080, () => {
    console.log("ELECTRON LOCAL NODE IS RUNNING ON 8080")
});

app.whenReady().then(() => {
    createWindow();
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('before-quit', () => {
    server.close();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});