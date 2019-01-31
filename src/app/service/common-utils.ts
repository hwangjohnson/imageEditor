import { AppSettings } from "./AppSettings";
import { ResponseType } from "./enum";
import "toastr";

export class CommonUtils {
    public static toaster(message, type: ResponseType) {
        // toastr.options.positionClass = 'toast-top-center';
        // toastr.options.closeButton = true;
        // toastr.options.progressBar = true;
        // toastr.options.preventDuplicates = true;
        // toastr.options.newestOnTop = true;

        // if (type === ResponseType.ERROR) {
        //     toastr.error(message);
        // } else if (type === ResponseType.SUCCESS) {
        //     toastr.success(message);
        // }
    }
}