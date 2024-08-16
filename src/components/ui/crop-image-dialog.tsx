import { Button } from "@/components/ui/button";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface CropImageDialogProps {
  src: string;
  cropAspectRatio: number;
  onCropped: (blob: Blob | null) => void;
  onClose: () => void;
}

export default function CropImageDialog({
  src,
  cropAspectRatio,
  onCropped,
  onClose,
}: CropImageDialogProps) {
  const croppedRef = useRef<ReactCropperElement>(null);

  function crop() {
    const cropper = croppedRef.current?.cropper;
    if (!cropper) return;
    cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp");
    onClose();
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[600px] max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cắt ảnh</DialogTitle>
        </DialogHeader>
        <Cropper
          src={src}
          aspectRatio={cropAspectRatio}
          zoomable={false}
          ref={croppedRef}
          className="m-auto max-h-[450px] w-full overflow-hidden"
        />
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={crop}>Cắt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
