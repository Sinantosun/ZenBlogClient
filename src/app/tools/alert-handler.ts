import Swal from "sweetalert2";

export const AlertHandler = {
    ShowConfirmMessage(title = "Emin Misiniz?", content = "Kaydı silmek istediğinize emin misiniz bu işlem geri alınamaz..!") {
        return Swal.fire({
            title: title,
            text: content,
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Hayır",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Evet"
        });
    }
}