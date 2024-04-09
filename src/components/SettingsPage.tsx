import Streak from "./settings-page/Streak";
import QuickAddConfiguration from "./settings-page/QuickAddConfiguration";
import Account from "./settings-page/Account";
import { RequestPermission } from "./settings-page/RequestPermission";

export default function SettingsPage() {
  return (
    <>
      <Streak />
      <QuickAddConfiguration />
      <RequestPermission onPermissionGranted={async () => undefined} />
      <Account />
    </>
  );
}
