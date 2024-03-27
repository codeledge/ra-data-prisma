import {
  List,
  Datagrid,
  TextField,
  DateField,
  ListProps,
  CreateProps,
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  AutocompleteArrayInput,
  ReferenceArrayInput,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  Edit,
  EditProps,
  NumberInput,
  ReferenceField,
  CloneButton,
  InfiniteList,
  InfiniteListProps,
} from "react-admin";
import { AutocompleteFilter } from "../filters/AutocompleteFilter";

export const PostList = (props: InfiniteListProps) => (
  <InfiniteList
    {...props}
    perPage={10}
    filters={[
      <AutocompleteFilter
        key={`1`}
        source={"userId"}
        reference={"user"}
        field={"name"}
        alwaysOn
      />,
      <TextInput
        key={`2`}
        label="Full-text search"
        source={"text"}
        alwaysOn
      />,
    ]}
  >
    <Datagrid rowClick={"show"}>
      <TextField source="id" />
      <ReferenceField
        source="userId"
        reference="user"
        label="User name"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="text" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <ReferenceArrayField
        label="Media"
        reference="media"
        source="mediaIds"
      >
        <SingleFieldList>
          <ChipField source="url" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField
        label="Tags"
        reference="tag"
        source="tagIds"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <CloneButton />
    </Datagrid>
  </InfiniteList>
);

export const PostCreate = (props: CreateProps) => (
  <Create
    title="New post"
    {...props}
  >
    <SimpleForm>
      <ReferenceInput
        label="User"
        source="userId"
        reference="user"
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="text" />
      <ReferenceArrayInput
        label="Tags"
        reference="tag"
        source="tagIds"
      >
        <AutocompleteArrayInput optionText={"name"} />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Media"
        reference="media"
        source="mediaIds"
      >
        <AutocompleteArrayInput optionText={"url"} />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);

export const PostEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput
        label="User"
        source="userId"
        reference="user"
      >
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="text" />
      <NumberInput
        disabled
        source="_tags_count"
      />
      <ReferenceArrayInput
        label="Tags"
        reference="tag"
        source="tagIds"
      >
        <AutocompleteArrayInput optionText={"name"} />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Media"
        reference="media"
        source="mediaIds"
      >
        <AutocompleteArrayInput optionText={"url"} />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);
