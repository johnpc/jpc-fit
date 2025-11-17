import { Card, Button, Label } from "@aws-amplify/ui-react";
import { LocalNotifications } from "@capacitor/local-notifications";
import { CapacitorHealthkit } from "@perfood/capacitor-healthkit";
import { useState } from "react";

const HAS_PERMISSION_KEY = "hasPermission";

export function HealthKitPermission() {
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(
    localStorage.getItem(HAS_PERMISSION_KEY) === HAS_PERMISSION_KEY
  );

  const handleGrantPermission = async () => {
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
    localStorage.setItem(HAS_PERMISSION_KEY, HAS_PERMISSION_KEY);
    setHasPermission(true);
    setLoading(false);
  };

  const handleLaunchHealthKit = async () => {
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
      {!hasPermission ? (
        <Button
          variation="primary"
          isLoading={loading}
          margin={"10px"}
          onClick={handleGrantPermission}
        >
          Grant Permission
        </Button>
      ) : (
        <Button margin={"10px"} onClick={handleLaunchHealthKit}>
          Launch Healthkit
        </Button>
      )}
    </Card>
  );
}
