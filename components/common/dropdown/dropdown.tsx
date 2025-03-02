import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

interface DropdownItem {
  value: string;
  label: string;
}

interface DropdownProps {
  title: string | React.ReactNode;
  items: DropdownItem[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, items, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
        sx={{
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {title}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {items.map((item) => (
          <MenuItem key={item.value} onClick={() => handleSelect(item.value)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Dropdown;
