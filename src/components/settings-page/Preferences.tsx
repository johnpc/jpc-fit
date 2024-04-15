import { Card, SwitchField } from "@aws-amplify/ui-react";
import { useState } from "react";
import { PreferencesEntity, updatePreferences } from "../../data/entities";

export default function Preferences(props: {
  preferences?: PreferencesEntity;
}) {
  const [isUpdating, setIsUpdating] = useState<boolean>();

  const onUpdatePreferences = async (
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
  return (
    <Card textAlign={"left"}>
      <SwitchField
        isChecked={props.preferences?.hideProtein}
        isDisabled={isUpdating}
        onChange={onUpdatePreferences}
        label="Hide Protein"
        labelPosition="start"
      />
    </Card>
  );
}
