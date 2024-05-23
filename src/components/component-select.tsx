import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type ComponentSelectProps = {
  name?: string;
  defaultValue?: string;
  onChange?: (e: any) => void;
  label: string;
  placeholder: string;
  items: any;
};

const ComponentSelect = React.forwardRef<HTMLDivElement, ComponentSelectProps>(
  (
    { defaultValue, onChange, name, label, placeholder, items, ...props },
    ref
  ) => {
    return (
      <Select
        defaultValue={defaultValue}
        onValueChange={onChange}
        {...props}
        name={name}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item: any) => (
              <SelectItem key={item.id} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);

ComponentSelect.displayName = "ComponentSelect";

export default ComponentSelect;
