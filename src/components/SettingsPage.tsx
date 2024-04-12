import Streak from "./settings-page/Streak";
import QuickAddConfiguration from "./settings-page/QuickAddConfiguration";
import Account from "./settings-page/Account";
import { RequestPermission } from "./settings-page/RequestPermission";
import Preferences from "./settings-page/Preferences";

export default function SettingsPage() {
  return (
    <>
      <Streak />
      <QuickAddConfiguration />
      <Preferences />
      <RequestPermission onPermissionGranted={async () => undefined} />
      <Account />
    </>
  );
}
