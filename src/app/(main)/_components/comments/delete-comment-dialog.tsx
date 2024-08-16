import { useDeleteCommentMutation } from "@/app/(main)/_components/comments/mutation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/loading-button";
import { CommentData } from "@/lib/types";

interface DeleteCommentDialogProps {
  comment: CommentData;
  onClose: () => void;
  open: boolean;
}

export default function DeleteCommentDialog({
  comment,
  onClose,
  open,
}: DeleteCommentDialogProps) {
  const mutation = useDeleteCommentMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa bình luận?</DialogTitle>
          <DialogDescription>
            Bạn có muốn xóa bình luận này! Bình luận sẽ bị xóa vĩnh viễn và
            không thể khôi phục!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={() => mutation.mutate(comment.id, { onSuccess: onClose })}
            loading={mutation.isPending}
          >
            Xóa
          </LoadingButton>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Không
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
