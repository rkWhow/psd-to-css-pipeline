import { newAdobeApp, AdobeAppName, AdobeAppEvent, AdobeApp, BroadcastMessage } from "adobe-node";

const sleep = (duration: number) => new Promise(resolve => { setTimeout(resolve, duration) });

const main = async () => {
    const app: AdobeApp = newAdobeApp({
        app: {
            name: AdobeAppName.Photoshop,
            path: '/Applications/Adobe Photoshop CC 2019/Adobe Photoshop CC 2019.app/Contents/MacOS/Adobe Photoshop CC 2019',
            adobeScriptsPath: '/Applications/Adobe Photoshop CC 2019/Presets/Scripts'
        },
        host: 'localhost',
        port: 5000
    });

    app.on(AdobeAppEvent.OpenApp, () => {
        console.log(`The Adobe App is open`);
    })
    .on(AdobeAppEvent.OpenDocument, () => {
        console.log(`Document has been opened`);
    })
    .on(AdobeAppEvent.CloseDocument, () => {
        console.log(`Document has been closed`);
    })
    .on(AdobeAppEvent.CloseApp, () => {
        console.log(`The Adobe App has been closed`);
    })
    .on("export_css", (message: BroadcastMessage) => {
        console.log(`CSS export done`);
    })
    .on("export_selected_layers_to_pngs", (message: BroadcastMessage) => {
        console.log(`PNGs export done`);
    });

    app.init();
    
    await app.open();
    await app.openDocument('psd/test1.psd');
    await app.runScript('export_css');
    await app.runScript('export_selected_layers_to_pngs');
    await app.closeDocument('psd/test1.psd');
    await app.close();
    app.dispose();
}

main();
