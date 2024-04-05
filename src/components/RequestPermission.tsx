import { Card, Text, Button } from "@aws-amplify/ui-react";
import { CapacitorHealthkit } from "@perfood/capacitor-healthkit";

export const RequestPermission = (props: {
  onPermissionGranted: () => Promise<void>;
}) => {
  const onPermissionClick = async () => {
    console.log({ permissionClick: true });

    const readPermissions = ["calories", "steps", "weight", "activity"];
    await CapacitorHealthkit.requestAuthorization({
      all: [],
      read: readPermissions,
      write: [],
    });
    await props.onPermissionGranted();
  };
  const onLaunchHealthkitClick = () => {
    window.location.href = "x-apple-health://browse";
  };
  return (
    <Card>
      <Text as="span">No HealthKit data available. Grant permission?</Text>
      <Button margin={"10px"} onClick={onPermissionClick}>
        Permission
      </Button>
      <Button margin={"10px"} onClick={onLaunchHealthkitClick}>
        Launch Healthkit
      </Button>
    </Card>
  );
};
