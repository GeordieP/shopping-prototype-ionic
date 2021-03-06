import React from "react";
import {
  IonContent,
  IonItem,
  IonButton,
  IonInput,
  IonLabel
} from "@ionic/react";

import TagToggle from "../components/TagToggle";

import useInput from "../hooks/useInput";

const EditItem: React.FC<EditItemProps> = ({ item, saveItem, tags }) => {
  const nameInput = useInput(item.name);
  const priceInput = useInput(item.price);
  const [selectedTags, setSelectedTags] = React.useState(item.tagIds);

  function onSubmit() {
    saveItem({
      ...item,
      name: nameInput.value,
      price: priceInput.value,
      tagIds: selectedTags
    });
  }

  function addTag(tagId: string) {
    setSelectedTags([...selectedTags, tagId]);
  }

  function removeTag(tagId: string) {
    setSelectedTags(selectedTags.filter(t => t !== tagId));
  }

  return (
    <IonContent>
      <h1>Edit Item</h1>

      <IonItem>
        <IonLabel>Name</IonLabel>
        <IonInput {...nameInput} />
      </IonItem>

      <IonItem>
        <IonLabel>Price</IonLabel>
        <IonInput {...priceInput} clearOnEdit />
      </IonItem>

      <IonItem>
        {tags.map(t => {
          const toggled = selectedTags.includes(t.id);

          const onClick = () => {
            if (toggled) removeTag(t.id);
            else addTag(t.id);
          };

          return (
            <TagToggle
              key={t.id}
              name={t.name}
              color={t.color}
              toggled={toggled}
              onClick={onClick}
            />
          );
        })}
      </IonItem>

      <IonItem>
        <IonButton expand="block" onClick={onSubmit}>
          Save
        </IonButton>
      </IonItem>
    </IonContent>
  );
};

export default EditItem;

// Types

interface EditItemProps {
  item: Item;
  saveItem: (item: Item) => void;
  tags: Tag[];
}
