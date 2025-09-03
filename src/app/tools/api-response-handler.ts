declare const alertify: any
export const APIResponseHandler = {
    Handle(response: any) {
        let err = response.error.errors[0].errorMessage;
        if (err == "Beklenmeyen bir hata oluştu") {
            alertify.error("Beklenmeyen bir hata oluştu!");
        }
        else if (err) {
            alertify.error("Veri Kaydedilemedi...!");
            return err;
        }
        else {
            alertify.error("Beklenmeyen bir hata oluştu!");
        }
    }
}