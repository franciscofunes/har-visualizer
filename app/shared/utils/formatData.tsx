
export const durationFormatter = (params: any): string => {
    const durationValue = params.data?.time; // Assuming 'time' is the property representing duration
    if (typeof durationValue === 'number') {
        return `${durationValue.toFixed(2)} ms`;
    }
    return ''; // Handle cases where 'time' is not available or not a number
};

export const startedDateTimeFormatter = (params: any): string => {
    const startedDateTime = params.data?.startedDateTime; // Assuming 'startedDateTime' is the property representing start time
    if (typeof startedDateTime === 'string') {
        const dateTimeParts = startedDateTime.split('T');
        const datePart = dateTimeParts[0]; // Extracting YYYY-MM-DD
        const timePart = dateTimeParts[1]?.slice(0, 5) || ''; // Extracting HH:mm, handle cases where timePart is undefined
        return `${datePart} ${timePart}`;
    }
    return ''; // Handle cases where 'startedDateTime' is not available or not a string
};

export const isNull = (field: any) => {
    return field == null || field == "" ? '-' : field
}

export const defaultFormatter = (params: any): string => {
    const fieldValue = params.data?.[params.colDef.field];
    return isNull(fieldValue);
};

export const sizeFormatter = (params: any): string => {
    const sizeInBytes = params.data?.response._transferSize;

    if (typeof sizeInBytes === 'number') {
        return formatBytes(sizeInBytes, 2);
    }

    return '';
};

export const formatBytes = (bytes: number, decimals: number) => {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const formatBytesReturnInt = (bytes: number): string => {
    if (bytes === 0) return '0 B';

    const k = 1024;

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(bytes / Math.pow(k, i));

    return formattedSize;
};

export const convertBytesToKilobytes = (bytes: number) => {
    return bytes / 1024; // Assuming 'response_transferSize' is in bytes
};

export const convertMillisecondsToSeconds = (milliseconds: number) => {
    return milliseconds / 1000; // Assuming 'time' is in milliseconds
};
