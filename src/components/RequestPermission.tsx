import { Card, Text, Button } from "@aws-amplify/ui-react";
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
    await props.onPermissionGranted();
    setLoading(false);
  };
  const onLaunchHealthkitClick = () => {
    window.location.href = "x-apple-health://browse";
  };
  return (
    <Card>
      <Text as="span">No HealthKit data available. Grant permission?</Text>
      <Button isLoading={loading} margin={"10px"} onClick={onPermissionClick}>
        Permission
      </Button>
      <Button margin={"10px"} onClick={onLaunchHealthkitClick}>
        Launch Healthkit
      </Button>
    </Card>
  );
};
