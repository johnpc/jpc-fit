import { Card, SwitchField } from "@aws-amplify/ui-react";
import { useState } from "react";
import { PreferencesEntity, updatePreferences } from "../../data/entities";

export default function Preferences(props: { preferences: PreferencesEntity }) {
  const [isUpdating, setIsUpdating] = useState<boolean>();

  const onUpdateProtein = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsUpdating(true);
    const shouldHideProtein = event.target.checked;
    await updatePreferences({
      ...props.preferences,
      hideProtein: shouldHideProtein,
    });
    setIsUpdating(false);
  };
  const onUpdateSteps = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUpdating(true);
    const shouldHideSteps = event.target.checked;
    await updatePreferences({
      ...props.preferences,
      hideSteps: shouldHideSteps,
    });
    setIsUpdating(false);
  };
  return (
    <Card textAlign={"left"}>
      <SwitchField
        isChecked={props.preferences?.hideProtein ?? false}
        isDisabled={isUpdating}
        onChange={onUpdateProtein}
        label="Hide Protein"
        labelPosition="start"
      />
      <SwitchField
        isChecked={props.preferences?.hideSteps ?? false}
        isDisabled={isUpdating}
        onChange={onUpdateSteps}
        label="Hide Steps"
        labelPosition="start"
      />
    </Card>
  );
}
