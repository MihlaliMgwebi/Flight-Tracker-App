export class Utils {
    static convertDateTimeToLocalUnixTimestampInSeconds(dateTimeInputValue: string): number {
        const MILLISECONDS_IN_SECOND: number = 1000;
        const unixTimestampInMilliseconds: number = Date.parse(dateTimeInputValue);
        const unixTimestampInSeconds: number = unixTimestampInMilliseconds / MILLISECONDS_IN_SECOND;
        return unixTimestampInSeconds;
    }
}