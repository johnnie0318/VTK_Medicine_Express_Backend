// import http from "../http-common";

import Axios from "axios";

class UploadFilesService {
  upload(files, src_aet, onUploadProgress) {
    let formData = new FormData();

    for (const i in files) {
      formData.append("dicom_files[]", files[i]);
    }
    formData.append("src_aet", src_aet);

    return Axios.post("/api/dicom-files/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
}

export default new UploadFilesService();
