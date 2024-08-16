import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";

export interface Attachment {
  file: File;
  mediaId?: string;
  isUploading: boolean;
}

export default function useMediaUpload() {
  const { toast } = useToast();

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const [uploadProgress, setUploadProgress] = useState<number>();

  const { isUploading, startUpload } = useUploadThing("attachments", {
    onBeforeUploadBegin(files) {
      const renamedFiles = files.map((file) => {
        const extention = file.name.split(".").pop();
        return new File(
          [file],
          `attachments_${crypto.randomUUID()}.${extention}`,
          { type: file.type },
        );
      });

      setAttachments((prev) => [
        ...prev,
        ...renamedFiles.map((file) => ({
          file,
          isUploading: true,
        })),
      ]);
      return renamedFiles;
    },
    onUploadProgress: setUploadProgress,
    onClientUploadComplete(res) {
      setAttachments((prev) =>
        prev.map((a) => {
          const uploadResult = res.find((r) => r.name === a.file.name);
          if (!uploadResult) return a;
          return {
            ...a,
            mediaId: uploadResult.serverData.mediaId,
            isUploading: false,
          };
        }),
      );
    },
    onUploadError(e) {
      setAttachments((prev) => prev.filter((a) => !a.isUploading));
      toast({
        variant: "destructive",
        description: "Có lỗi trong quá trình xử lý ảnh! Vui lòng chọn ảnh khác",
      });
    },
  });

  function handleStartUpload(files: File[]) {
    if (isUploading) {
      toast({
        variant: "destructive",
        description: "Vui lòng đợi sau khi bài viết hiện tại được đăng tải!",
      });
      return;
    }
    if (attachments.length + files.length > 5) {
      toast({
        variant: "destructive",
        description: "Không thể tải quá 5 tệp đính kèm",
      });
      return;
    }
    files.map((file) => {
      if (file.type === "image/*" && file.size > 1024 * 1024 * 8) {
        toast({
          variant: "destructive",
          description: "Ảnh được chọn phải có dung lượng nhỏ hơn 8MB",
        });
        return;
      }
      if (file.type === "video/*" && file.size > 1024 * 1024 * 64) {
        toast({
          variant: "destructive",
          description: "Video được chọn phải có dung lượng nhỏ hơn 64MB",
        });
        return;
      }
    });

    startUpload(files);
  }

  function removeAttachment(flieName: string) {
    setAttachments((prev) => prev.filter((a) => a.file.name !== flieName));
  }

  function reset() {
    setAttachments([]);
    setUploadProgress(undefined);
  }

  return {
    startUpload: handleStartUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset,
  };
}
