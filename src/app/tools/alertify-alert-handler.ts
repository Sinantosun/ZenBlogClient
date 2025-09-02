declare const alertify: any

export const AlertifyAlertHandler = {

    AlertifySuccess(text: string) {
        alertify.success(text);
    },
    AlertifyError(text: string) {
        alertify.error(text);
    }
}