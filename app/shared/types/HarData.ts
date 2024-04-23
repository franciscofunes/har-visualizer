export type HarDataRow = {
    _initiator: {
        type: string;
        url?: string; // Make url property optional
    };
    _priority: string;
    _resourceType: string;
    cache: object;
    connection: string;
    pageref?: string; // Make pageref property optional
    request: {
        method: string;
        url: string;
        headers: Record<string, string>[];
    };
    response: {
        status: number;
        headers: Record<string, string>[];
        _transferSize: number;
        content: {
            size: number;
            mimeType: string;
        };
        redirectURL: string;
    };
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
  