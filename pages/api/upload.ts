import { HarDataRow } from '@/app/shared/types/HarData';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
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

          const csvData: HarDataRow[] = entries.map((entry: any) => {
            const requestHeaders = entry.request.headers.reduce((acc: any, header: any) => {
              acc[header.name] = header.value;
              return acc;
            }, {});

            const responseHeaders = entry.response.headers.reduce((acc: any, header: any) => {
              acc[header.name] = header.value;
              return acc;
            }, {});

            return {
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
          });

          res.status(200).json({ harData: csvData });
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
