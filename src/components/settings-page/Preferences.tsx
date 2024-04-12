import { Card, SwitchField } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import {
  PreferencesEntity,
  createPreferencesListener,
  getPreferences,
  unsubscribeListener,
  updatePreferences,
  updatePreferencesListener,
} from "../../data/entities";

export default function Preferences() {
  const [preferences, setPreferences] = useState<PreferencesEntity>();
  const [isUpdating, setIsUpdating] = useState<boolean>();
  const setup = async () => {
    setPreferences(await getPreferences());
  };
  useEffect(() => {
    setup();
    const createPreferencesSubscription = createPreferencesListener(setup);
    const updatePreferencesSubscription = updatePreferencesListener(setup);
    return () => {
      unsubscribeListener(createPreferencesSubscription);
      unsubscribeListener(updatePreferencesSubscription);
    };
  }, []);

  const onUpdatePreferences = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsUpdating(true);
    const shouldHideProtein = event.target.checked;
    console.log({
      event,
      value: event.target.value,
      checked: event.target.checked,
    });
    await updatePreferences({
      ...preferences,
      hideProtein: shouldHideProtein,
    });
    setIsUpdating(false);
  };
  return (
    <Card textAlign={"left"}>
      <SwitchField
        isChecked={preferences?.hideProtein}
        isDisabled={isUpdating || !preferences}
        onChange={onUpdatePreferences}
        label="Hide Protein"
        labelPosition="start"
      />
    </Card>
  );
}
