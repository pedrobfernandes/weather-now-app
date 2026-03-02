import * as Select from "@radix-ui/react-select";
import { useUnit } from "../context/UnitContext";
import { IconCheckmark } from "../icons/IconCheckmark";
import { IconDropdown } from "../icons/IconDropdown";

import "./RadixSelect.css";

export default function UnitsSelector()
{
    const { unit, setUnit } = useUnit();
    
    return(
        <>
        <span
            className="visually-hidden"
            id="unit-selector-label"
        >
            Switch between metric and imperial units
        </span>
        <Select.Root
            value={unit}
            onValueChange={
                (value) => setUnit(value as "metric" | "imperial")
            }>
            <Select.Trigger
                className="unit-selector"
                aria-describedby="unit-selector-label"
            >
                <Select.Value/>
                <Select.Icon>
                    <IconDropdown/>
                </Select.Icon>
            </Select.Trigger>
            <Select.Content
                position="popper"
                align="start"
                className="radix-select-content"
            >
                <Select.Viewport>
                    <Select.Item className="radix-select-item" value="metric">
                        <Select.ItemText>Metric</Select.ItemText>
                        <Select.ItemIndicator>
                            <IconCheckmark/>
                        </Select.ItemIndicator>
                    </Select.Item>
                    <Select.Item className="radix-select-item" value="imperial">
                        <Select.ItemText>Imperial</Select.ItemText>
                        <Select.ItemIndicator>
                            <IconCheckmark/>
                        </Select.ItemIndicator>
                    </Select.Item>
                </Select.Viewport>
            </Select.Content>
        </Select.Root>
        </>
    );
}
