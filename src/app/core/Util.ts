export class Util {

    public static stringInvalidOrEmpty(input: string): boolean {
        return !(input !== undefined && input !== null && input.trim().length > 0);
    }

    /**
     * Parses the date string to localetime without time
     * @param date The date to parse
    */
    public static ParseDate(date: string): string {
        return new Date(date).toLocaleDateString();
    }

    static convertToBase64(file: File, callback) : void {
        if (file == null) {
            return callback(null, true);
        }
        var reader = new FileReader();
        reader.onloadend = () => {
            var base = reader.result.toString().split('base64,')[1];
            if (base.length > 0) {
                callback(base, null);
            } else {
                callback(null, true);
            }
        }
        reader.readAsDataURL(file);
    }



    /**
     * This helps with getting numbers for the html *ngFor
     * @param start The number that you start with(user will see it)
     * @param end the number you want to end with(user will see it)
     */
    public getNumbersForHTML(start: number = 0, end: number = 0) : number[] {
        let arr = [];
        if (start == 0 && end == 0 || start == end || start > end) {
        return null;
        }

        if (start > 0 && end == 0) {
        for (let i = 1; i < start + 1; i++) {
            arr.push(i);
        }
        } else {
        for (let i = start; i < end + 1; i++) {
            arr.push(i);
        }
        }
        return arr;
    }

}