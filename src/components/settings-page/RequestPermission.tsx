import { Card, Button, Label } from "@aws-amplify/ui-react";
import { LocalNotifications } from "@capacitor/local-notifications";
import { CapacitorHealthkit } from "@perfood/capacitor-healthkit";
import { useState } from "react";
import { getCache, HAS_PERMISSION_KEY, setCache } from "../../data/cache";

export const RequestPermission = (props: {
  onPermissionGranted: () => Promise<void>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onPermissionClick = async () => {
    setLoading(true);
    const readPermissions = ["calories", "steps", "weight", "activity"];
    await CapacitorHealthkit.requestAuthorization({
      all: [],
      read: readPermissions,
      write: [],
    });

    await LocalNotifications.requestPermissions();
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Have you logged lunch?",
          body: "Log your food",
          id: 13,
          schedule: {
            allowWhileIdle: true,
            on: {
              hour: 13,
            },
          },
        },
        {
          title: "Have you logged dinner?",
          body: "Log your food",
          id: 20,
          schedule: {
            allowWhileIdle: true,
            on: {
              hour: 20,
            },
          },
        },
      ],
    });
    setCache(HAS_PERMISSION_KEY, HAS_PERMISSION_KEY);
    await props.onPermissionGranted();
    setLoading(false);
  };

  const onLaunchHealthkitClick = async () => {
    const readPermissions = ["calories", "steps", "weight", "activity"];
    await CapacitorHealthkit.requestAuthorization({
      all: [],
      read: readPermissions,
      write: [],
    });

    window.location.href = "x-apple-health://Sources/jpc.fit";
  };
  return (
    <Card>
      <Label as="div">
        HealthKit data and notifications provide the best experience for this
        app. Grant permission?
      </Label>
      <br />
      {!getCache(HAS_PERMISSION_KEY) ? (
        <Button
          variation="primary"
          isLoading={loading}
          margin={"10px"}
          onClick={onPermissionClick}
        >
          Grant Permission
        </Button>
      ) : (
        <Button margin={"10px"} onClick={onLaunchHealthkitClick}>
          Launch Healthkit
        </Button>
      )}
    </Card>
  );
};
