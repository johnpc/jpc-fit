import { Divider } from "@aws-amplify/ui-react";
import { TShirtSizeDisclaimer } from "./TShirtSizeDisclaimer";
import { CreateQuickAdd } from "./CreateQuickAdd";
import { YourQuickAdds } from "./YourQuickAdds";
import { HiddenFieldsPreferences } from "./HiddenFieldsPreferences";
import { HealthKitPermission } from "./HealthKitPermission";
import { Auth } from "./Auth";

export default function SettingsPage() {
  return (
    <>
      <TShirtSizeDisclaimer />
      <CreateQuickAdd />
      <Divider />
      <YourQuickAdds />
      <HiddenFieldsPreferences />
      <HealthKitPermission />
      <Auth />
    </>
  );
}
