import {Card, Button, Label} from "@aws-amplify/ui-react";
import { LocalNotifications } from "@capacitor/local-notifications";
import {Divider} from "@mui/material";
import {CapacitorHealthkit} from "@perfood/capacitor-healthkit";
import {useState} from "react";

export const RequestPermission = (props: {
  onPermissionGranted: () => Promise<void>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onPermissionClick = async () => {
    console.log({permissionClick: true});
    setLoading(true);
    const readPermissions = ["calories", "steps", "weight", "activity"];
    await CapacitorHealthkit.requestAuthorization({
      all: [],
      read: readPermissions,
      write: [],
    });

    const date = new Date();
    await LocalNotifications.requestPermissions();
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Have you logged lunch?",
          body: "Log your food",
          id: date.getTime() + 2,
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
          id: date.getTime() + 3,
          schedule: {
            allowWhileIdle: true,
            on: {
              hour: 20,
            },
          },
        },
      ],
    });
    localStorage.setItem("hasPermission", "hasPermission");
    await props.onPermissionGranted();
    setLoading(false);
  };

  const onLaunchHealthkitClick = () => {
    window.location.href = "x-apple-health://Sources/jpc.fit";
  };
  return (
    <Card>
      <Label as="div">
        HealthKit data and notifications provide the best experience for this app. Grant
        permission?
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
      <Divider style={{margin: "10px"}} />
      <Label as="div">Problem with permissions?</Label>
      <br />
      <Button margin={"10px"} onClick={onLaunchHealthkitClick}>
        Launch Healthkit
      </Button>
    </Card>
  );
};
