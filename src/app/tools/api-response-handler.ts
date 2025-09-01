declare const alertify: any
export const APIResponseHandler = {
    Handle(response: any) {
        let err = response.error.errors[0].errorMessage;
        console.log(err);
        if (err == "Beklenmeyen bir hata oluştu") {
            alertify.error("Beklenmeyen bir hata oluştu kategori kaydedilemedi...!");
        }
        else if (err) {
            alertify.error("Kategori Kaydedilemedi...!");
            return err;
        }
    }
}