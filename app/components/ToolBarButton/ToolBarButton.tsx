"use client";
import { IconButton, Tooltip, useTheme } from "@mui/material";

interface ToolBarButton {
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}

const ToolBarButton = ({ onClick, children, title }: ToolBarButton) => {
  const theme = useTheme();

  return (
    <Tooltip title={title}>
      <IconButton
        edge="start"
        sx={{
          borderRadius: 2,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            borderRadius: 2,
          },
        }}
        onClick={onClick}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default ToolBarButton;
