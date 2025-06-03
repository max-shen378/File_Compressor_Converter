// compressWorker.js
importScripts('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');

self.onmessage = async function(event) {
    const file = event.data;
    const zip = new JSZip();
    
    // Add the file to the zip
    zip.file(file.name, file);

    try {
        const compressedBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
        self.postMessage(compressedBlob); // Send the compressed blob back to the main thread
    } catch (error) {
        console.error('Compression failed:', error);
    }
};
