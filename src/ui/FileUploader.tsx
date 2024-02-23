import { CSSProperties, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileUpload as FileUploadIcon } from "react-icons/fa";
import { IoCloseSharp as DeleteIcon } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

import { Button } from "@/ui";
import { ProductImage } from "@/@types/product";

interface FileUploaderProps {
  onUploadFiles: (files: File[]) => void;
  onDeleteFile: (public_id: string) => void;
  uploading: boolean;
  displayImages: ProductImage[];
  baseStyle?: CSSProperties;
  focusedStyle?: CSSProperties;
  acceptStyle?: CSSProperties;
  rejectStyle?: CSSProperties;
}

export default function FileUploader({
  onUploadFiles,
  onDeleteFile,
  uploading,
  displayImages,
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
}: FileUploaderProps) {
  const onDrop = (files: File[]) => {
    onUploadFiles(files);
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    noKeyboard: true,
    noClick: true,
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <div className="flex flex-col mb-4 w-full">
      <label>Upload product images</label>
      <div className="mt-2">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <FileUploadIcon size={35} />
          {isDragActive ? (
            <p className="mt-3 mb-2 text-xl">Drop images here</p>
          ) : (
            <p className="mt-3 mb-2 text-xl">
              Drag and drop images here or click to select
            </p>
          )}

          <Button
            label="Open file dialog"
            handleOnClick={open}
            className="text-md"
            isDisabled={uploading}
          />
        </div>
      </div>
      {uploading ? (
        <ClipLoader size="20px" color="#A2A2A2" className="mt-2" />
      ) : (
        <aside className="flex flex-row flex-wrap mt-6 gap-6">
          {displayImages?.map((img) => (
            <div
              className="inline-flex p-2 border border-black w-[100px] h-[100px] box-border relative"
              key={img.public_id}
            >
              <div className="flex min-w-0 overflow-hidden">
                <img src={img.secure_url} className="block w-auto h-full" />
              </div>
              <div
                className="absolute -top-3 -right-3 cursor-pointer bg-white rounded-full p-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                onClick={() => onDeleteFile(img.public_id)}
              >
                <DeleteIcon size={15} />
              </div>
            </div>
          ))}
        </aside>
      )}
    </div>
  );
}
