"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, CheckCircle, AlertCircle, FileVideo, PlayCircle } from "lucide-react";

interface VideoUploadProps {
  onSuccess?: () => void;
}

export default function VideoUpload({ onSuccess }: VideoUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setTitle(e.target.files[0].name.split(".")[0]); // Default title
      setStatus("idle");
      setProgress(0);
      setErrorMessage("");
    }
  };

  const cancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
    }
    setStatus("idle");
    setProgress(0);
  };

  const uploadFile = async () => {
    if (!file || !title) return;
    
    setStatus("uploading");
    setProgress(0);
    setErrorMessage("");

    try {
      // 1. Get Presigned URL
      const urlRes = await fetch("/api/admin/r2-videos/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        }),
      });

      if (!urlRes.ok) {
        const err = await urlRes.json();
        throw new Error(err.message || "Failed to get upload URL");
      }

      const { uploadUrl, storageKey } = await urlRes.json();

      // 2. Upload to R2 directly
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setProgress(percentComplete);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.onabort = () => reject(new Error("Upload cancelled"));

        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });

      // 3. Notify backend of completion
      const completeRes = await fetch("/api/admin/r2-videos/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          storageKey,
        }),
      });

      if (!completeRes.ok) {
        const err = await completeRes.json();
        throw new Error(err.message || "Failed to finalize upload");
      }

      setStatus("success");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      if (err.message === "Upload cancelled") {
        setStatus("idle");
      } else {
        setStatus("error");
        setErrorMessage(err.message || "An unexpected error occurred");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith("video/")) {
        setFile(droppedFile);
        setTitle(droppedFile.name.split(".")[0]);
        setStatus("idle");
      } else {
        setStatus("error");
        setErrorMessage("Please drop a valid video file.");
      }
    }
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6 max-w-2xl mx-auto w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Video</h2>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-10 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h3 className="text-lg font-medium text-green-800">Upload Complete!</h3>
          <p className="text-green-600 mt-1">Your video has been saved successfully.</p>
          <button 
            onClick={() => { setFile(null); setStatus("idle"); setTitle(""); setDescription(""); }}
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Upload Another
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Drag & Drop Area */}
          {!file && (
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative"
            >
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-sm text-gray-600 font-medium">Drag video here or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">MP4, WebM, MOV up to 2GB</p>
            </div>
          )}

          {/* Selected File Details & Form */}
          {file && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <FileVideo className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                {status !== "uploading" && (
                  <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={status === "uploading"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                  disabled={status === "uploading"}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {status === "error" && (
            <div className="flex items-center p-3 text-sm text-red-800 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Progress Bar */}
          {status === "uploading" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Actions */}
          {file && (
            <div className="pt-4 flex items-center justify-end space-x-3">
              {status === "uploading" ? (
                <button
                  onClick={cancelUpload}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={uploadFile}
                  disabled={!title.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 flex items-center"
                >
                  <UploadCloud className="w-4 h-4 mr-2" />
                  {status === "error" ? "Retry Upload" : "Start Upload"}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
