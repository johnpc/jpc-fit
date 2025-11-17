import { Button, Card, Link, useTheme } from "@aws-amplify/ui-react";
import { deleteUser, signOut } from "aws-amplify/auth";

export function Auth() {
  const { tokens } = useTheme();

  const handleDeleteUser = async () => {
    const shouldDelete = confirm(
      "Are you sure? This will delete your account and all associated data.",
    );
    if (!shouldDelete) {
      return;
    }
    await deleteUser();
    await signOut();
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleClearCache = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <Card textAlign={"center"}>
        <Button margin={tokens.space.medium} onClick={handleClearCache}>
          Clear Cache
        </Button>{" "}
        <Button
          margin={tokens.space.medium}
          variation="warning"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
        <Button
          margin={tokens.space.medium}
          variation="destructive"
          onClick={handleDeleteUser}
        >
          Delete Account
        </Button>
      </Card>
      <Card marginTop={tokens.space.medium}>
        For support, send an email to{" "}
        <Link href="mailto:john@johncorser.com">john@johncorser.com</Link>
      </Card>
    </>
  );
}
