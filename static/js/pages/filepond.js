
// Filepond: Basic
FilePond.create(document.querySelector(".basic-filepond"), {
  credits: null,
  allowImagePreview: false,
  allowMultiple: false,
  allowFileEncode: false,
  required: false,
  storeAsFile: true,
})

// Filepond: Multiple Files
document.querySelectorAll(".multiple-files-filepond").forEach(element => {
  FilePond.create(element, {
    credits: null,
    allowImagePreview: false,
    allowMultiple: true,
    allowFileEncode: false,
    required: true,
    storeAsFile: true,
  });
});


// Filepond: With Validation
FilePond.create(document.querySelector(".with-validation-filepond"), {
  credits: null,
  allowImagePreview: false,
  allowMultiple: true,
  allowFileEncode: false,
  required: true,
  acceptedFileTypes: ["image/png"],
  fileValidateTypeDetectType: (source, type) =>
    new Promise((resolve, reject) => {
      // Do custom type detection here and return with promise
      resolve(type)
    }),
  storeAsFile: true,
})