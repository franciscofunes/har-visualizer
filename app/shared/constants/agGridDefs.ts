import { ColDef } from 'ag-grid-community';
import { defaultFormatter, sizeFormatter, durationFormatter, startedDateTimeFormatter } from '../utils/formatData';

export const columnDefs: ColDef[] = [
  { headerName: 'Initiator URL', field: '_initiator_url', valueFormatter: defaultFormatter, filter: 'agTextColumnFilter' },
  { headerName: 'Request URL', field: 'request_url', filter: 'agTextColumnFilter' },
  { headerName: 'Size', field: 'response_transferSize', valueFormatter: sizeFormatter, filter: 'agNumberColumnFilter' },
  { headerName: 'Time', field: 'time', filter: 'agNumberColumnFilter', valueFormatter: durationFormatter },
  { headerName: 'Request Method', field: 'request_method', filter: 'agTextColumnFilter' },
  { headerName: 'Resource Type', field: '_resourceType', filter: 'agTextColumnFilter' },
  { headerName: 'Response Status', field: 'response_status', filter: 'agNumberColumnFilter' },
  { headerName: 'Started DateTime', field: 'startedDateTime', valueFormatter: startedDateTimeFormatter, filter: 'agDateColumnFilter' },
  { headerName: 'Server IP Address', field: 'serverIPAddress', valueFormatter: defaultFormatter, filter: 'agTextColumnFilter' },
  { headerName: 'Priority', field: '_priority', filter: 'agTextColumnFilter' },
];