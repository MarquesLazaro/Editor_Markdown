"use client";
import SyncIcon from "@mui/icons-material/Sync";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { SaveStatus } from "@/app/types/SaveStatus";
import { Box, Typography, useTheme } from "@mui/material";

const SaveStatusView = ({ status }: { status: SaveStatus }) => {
  const theme = useTheme();
  let icon = <SyncIcon />;
  let text = "";

  if (status === SaveStatus.NOT_SAVED) {
    icon = <DoNotDisturbIcon />;
    text = "Não Salvo";
  } else if (status === SaveStatus.SAVING) {
    icon = <SyncIcon />;
    text = "Salvando...";
  } else {
    icon = <CloudDoneIcon />;
    text = "Documento Salvo";
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: theme.palette.primary.contrastText,
      }}
    >
      {icon}
      <Typography>{text}</Typography>
    </Box>
  );
};

export default SaveStatusView;
