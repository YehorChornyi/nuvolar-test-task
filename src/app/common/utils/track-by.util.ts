export class TrackByUtil {
    /**
     * trackBy function to compare the current object with the new one by *ngFor element custom field
     *
     * @param _index - *ngFor element index (unused)
     * @param item - *ngFor element
     * @param key - *ngFor element key to use for tracking
     *
     * @static
     */
    static trackByCustomField = <T>(_index: number, item: T, key: keyof T): T[keyof T] => item[key] as T[keyof T];
}
