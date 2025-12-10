import { IconButton, useTheme } from "@mui/material";

const ToolBarButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const theme = useTheme();

  return (
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
  );
};

export default ToolBarButton;
