import QuickAddConfiguration from "./settings-page/QuickAddConfiguration";
import Account from "./settings-page/Account";
import { RequestPermission } from "./settings-page/RequestPermission";
import Preferences from "./settings-page/Preferences";
import { PreferencesEntity, QuickAddEntity } from "../data/entities";

export default function SettingsPage(props: {
  preferences: PreferencesEntity;
  quickAdds: QuickAddEntity[];
}) {
  return (
    <>
      <QuickAddConfiguration
        preferences={props.preferences}
        quickAdds={props.quickAdds}
      />
      <Preferences preferences={props.preferences} />
      <RequestPermission onPermissionGranted={async () => undefined} />
      <Account />
    </>
  );
}
