import { Card, SwitchField } from "@aws-amplify/ui-react";
import {
  usePreferences,
  useUpdatePreferences,
} from "../../hooks/usePreferences";

export function HiddenFieldsPreferences() {
  const { data: preferences } = usePreferences();
  const updatePreferences = useUpdatePreferences();

  const handleProteinToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (preferences) {
      updatePreferences.mutate({
        ...preferences,
        hideProtein: e.target.checked,
      });
    }
  };

  const handleStepsToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (preferences) {
      updatePreferences.mutate({
        ...preferences,
        hideSteps: e.target.checked,
      });
    }
  };

  return (
    <Card textAlign={"left"}>
      <SwitchField
        isChecked={preferences?.hideProtein ?? false}
        isDisabled={updatePreferences.isPending}
        onChange={handleProteinToggle}
        label="Hide Protein"
        labelPosition="start"
      />
      <SwitchField
        isChecked={preferences?.hideSteps ?? false}
        isDisabled={updatePreferences.isPending}
        onChange={handleStepsToggle}
        label="Hide Steps"
        labelPosition="start"
      />
    </Card>
  );
}
