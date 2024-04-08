import { Button, Card, useTheme } from "@aws-amplify/ui-react";
import { deleteUser, signOut } from "aws-amplify/auth";

export default function Account() {
  const { tokens } = useTheme();
  const onDeleteUser = async () => {
    const shouldDelete = confirm(
      "Are you sure? This will delete your account and all associated data.",
    );
    if (!shouldDelete) {
      return;
    }
    await deleteUser();
    await signOut();
  };
  const onSignOut = async () => {
    await signOut();
  };
  return (
    <Card textAlign={"center"}>
      <Button
        margin={tokens.space.medium}
        variation="warning"
        onClick={onSignOut}
      >
        Sign Out
      </Button>
      <Button
        margin={tokens.space.medium}
        variation="destructive"
        onClick={onDeleteUser}
      >
        Delete Account
      </Button>
    </Card>
  );
}
