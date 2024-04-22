import { HarDataRow } from '@/app/shared/types/HarData';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '20mb',
  },
};

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      upload.single('harFile')(req, res, (err: any) => {
        if (err) {
          console.error('Error processing .har file:', err);
          res.status(500).end();
          return;
        }

        if (req.file && req.file.buffer) {
          const harFile = req.file.buffer.toString();
          const harData = JSON.parse(harFile);
          const entries = harData.log.entries;

          const jsonData: HarDataRow[] = [];
          let currentSize = 0;

          entries.forEach((entry: any) => {
            const requestHeaders = entry.request.headers.reduce((acc: any, header: any) => {
              acc[header.name] = header.value;
              return acc;
            }, {});

            const responseHeaders = entry.response.headers.reduce((acc: any, header: any) => {
              acc[header.name] = header.value;
              return acc;
            }, {});

            const entryData: HarDataRow = {
              _initiator_type: entry._initiator.type,
              _initiator_url: entry._initiator.url,
              _initiator_lineNumber: entry._initiator.lineNumber,
              _priority: entry._priority,
              _resourceType: entry._resourceType,
              cache: entry.cache,
              connection: entry.connection,
              pageref: entry.pageref,
              request_method: entry.request.method,
              request_url: entry.request.url,
              request_headers: requestHeaders,
              response_status: entry.response.status,
              response_headers: responseHeaders,
              response_transferSize: entry.response._transferSize,
              serverIPAddress: entry.serverIPAddress,
              startedDateTime: entry.startedDateTime,
              time: entry.time,
              timings: entry.timings,
            };

            const entrySize = Buffer.byteLength(JSON.stringify(entryData), 'utf-8');

            // Check if adding the current entry will exceed the payload size limit
            if (currentSize + entrySize > 4.5 * 1024 * 1024) {
              // Send the current chunk of data
              res.write(JSON.stringify(jsonData));
              // Reset jsonData and currentSize for the next chunk
              jsonData.length = 0;
              currentSize = 0;
            }

            // Add the current entry to the chunk
            jsonData.push(entryData);
            currentSize += entrySize;
          });

          // Send the remaining chunk of data
          res.status(200).json({ harData: jsonData });
        } else {
          console.error('No file provided in the request');
          res.status(400).end(); // Bad Request
        }
      });
    } catch (error) {
      console.error('Error processing .har file:', error);
      res.status(500).end();
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
