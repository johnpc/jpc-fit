import { StorageManager, StorageImage } from "@aws-amplify/ui-react-storage";
import { Card, Button, Accordion } from "@aws-amplify/ui-react";
import { FoodEntity, updateFood } from "../data/entities";
import FoodUpdateForm from "../ui-components/FoodUpdateForm";
import { useState } from "react";
const makeHash = (length: number): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const FoodDetailPage = (props: {
  food: FoodEntity;
  onLeaveFoodDetail: () => void;
}) => {
  const [hash, setHash] = useState<string>(makeHash(5));
  const handleFileUpload = async (event: { key?: string }) => {
    const updatedFood = await updateFood({
      ...props.food,
      photos: [...(props.food.photos ?? []), event.key],
    });
    console.log({ updatedFood });
    setHash(makeHash(5));
  };

  console.log({ p: props.food.photos });
  return (
    <Card>
      <StorageManager
        acceptedFileTypes={["image/*"]}
        path={`images/${props.food.id}-${hash}/`}
        maxFileCount={1}
        isResumable
        onUploadSuccess={handleFileUpload}
      />
      <FoodUpdateForm
        food={props.food}
        overrides={{
          owner: {
            disabled: true,
            isRequired: false,
            isReadOnly: true,
          },
          photos: {
            disabled: true,
            hidden: true,
            isRequired: false,
            isReadOnly: true,
          },
          day: {
            disabled: true,
            hidden: true,
            isRequired: false,
            isReadOnly: true,
          },
        }}
      />
      <Accordion
        items={
          props.food.photos?.map((photo) => ({
            trigger: photo!,
            value: photo!,
            content: (
              <StorageImage
                width={400}
                key={photo}
                path={photo!}
                alt={photo!}
              />
            ),
          })) ?? []
        }
      />
      <Button
        isFullWidth={true}
        variation="primary"
        onClick={() => props.onLeaveFoodDetail()}
      >
        Done
      </Button>
    </Card>
  );
};
