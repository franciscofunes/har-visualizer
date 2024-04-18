export type HarDataRow = {
  _initiator_type: string;
  _initiator_url: string;
  _initiator_lineNumber: number;
  _priority: string;
  _resourceType: string;
  cache: object;
  connection: string;
  pageref: string;
  request_method: string;
  request_url: string;
  request_headers: Record<string, string>;
  response_status: number;
  response_headers: Record<string, string>;
  response_transferSize: number;
  serverIPAddress: string;
  startedDateTime: string;
  time: number;
  timings: {
    blocked: number;
    dns: number;
    ssl: number;
    connect: number;
    send: number;
    wait: number;
    receive: number;
    _blocked_queueing: number;
    _blocked_proxy: number;
  };
};


