import { Card, Button, Label } from "@aws-amplify/ui-react";
import { Divider } from "@mui/material";
import { CapacitorHealthkit } from "@perfood/capacitor-healthkit";
import { useState } from "react";

export const RequestPermission = (props: {
  onPermissionGranted: () => Promise<void>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onPermissionClick = async () => {
    console.log({ permissionClick: true });
    setLoading(true);
    const readPermissions = ["calories", "steps", "weight", "activity"];
    await CapacitorHealthkit.requestAuthorization({
      all: [],
      read: readPermissions,
      write: [],
    });
    localStorage.setItem('hasPermission', 'hasPermission');
    await props.onPermissionGranted();
    setLoading(false);
  };

  const onLaunchHealthkitClick = () => {
    window.location.href = "x-apple-health://Sources/jpc.fit";
  };
  return (
    <Card>
      <Label as="div">
        HealthKit data provides the best experience for this app. Grant permission?
      </Label>
      <br />
      <Button
        variation="primary"
        isLoading={loading}
        margin={"10px"}
        onClick={onPermissionClick}
      >
        Grant Permission
      </Button>
      <Divider style={{ margin: "10px" }} />
      <Label as="div">Problem with permissions?</Label>
      <br />
      <Button margin={"10px"} onClick={onLaunchHealthkitClick}>
        Launch Healthkit
      </Button>
    </Card>
  );
};
