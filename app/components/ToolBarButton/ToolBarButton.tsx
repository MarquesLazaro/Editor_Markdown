import { IconButton } from "@mui/material";

const ToolBarButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <IconButton
      color="inherit"
      edge="start"
      sx={{
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
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
