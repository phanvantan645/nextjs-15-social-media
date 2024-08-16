"use client";

import EditProfileDialog from "@/app/(main)/_components/edit-profile-dialog";
import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/types";
import { useState } from "react";

interface EditProfileButtonProps {
  user: UserData;
}

function EditProfileButton({ user }: EditProfileButtonProps) {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <>
      <Button variant="outline" onClick={() => setShowDialog(true)}>
        Chỉnh sửa
      </Button>
      <EditProfileDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
}

export default EditProfileButton;
