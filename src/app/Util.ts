export class Util {

    static convertToBase64(file: File, callback) : void {
        if (file == null) {
            return callback(null, "I'm null!");
        }
        var reader = new FileReader();
        reader.onloadend = () => {
            var base = reader.result.toString().split('base64,')[1];
            callback(base, null);
        }
        reader.readAsDataURL(file);
    }

}