import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image, { StaticImageData } from "next/image";

interface UserAvatarPreviewDialogProps {
  src: string | StaticImageData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function UserAvatarPreviewDialog({
  src,
  open,
  onOpenChange,
}: UserAvatarPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[600px] max-w-[600px] overflow-hidden p-0">
        <Image
          src={src}
          alt="Avatar"
          width={200}
          height={200}
          className="size-full"
        />
      </DialogContent>
    </Dialog>
  );
}

export default UserAvatarPreviewDialog;
