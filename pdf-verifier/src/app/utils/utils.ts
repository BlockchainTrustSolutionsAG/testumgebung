export class Utils {
    public static formatDate(date: Date): string {
        const day = ('0' + date.getDate()).substr(-2);
        const month = ('0' + (date.getMonth() + 1)).substr(-2);
        const hours = ('0' + date.getHours()).substr(-2);
        const min = ('0' + date.getMinutes()).substr(-2);
        const sec = ('0' + date.getSeconds()).substr(-2);
        return day + '.' + month + '.' + date.getFullYear() + ' ' + hours + ':' + min + ':' + sec;
    }
}
