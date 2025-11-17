import {
  Card,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@aws-amplify/ui-react";
import { Delete } from "@mui/icons-material";
import { findIcon } from "../../helpers/iconMap";
import { useQuickAdd, useDeleteQuickAdd } from "../../hooks/useQuickAdd";
import { usePreferences } from "../../hooks/usePreferences";
import { defaultQuickAdds } from "../calorie-page/defaultQuickAdds";

export function YourQuickAdds() {
  const { data: quickAdds = [] } = useQuickAdd();
  const { data: preferences } = usePreferences();
  const deleteQuickAdd = useDeleteQuickAdd();

  // Show default quick adds if no custom ones exist
  const displayQuickAdds = quickAdds.length > 0 ? quickAdds : defaultQuickAdds;

  const handleDelete = (id: string) => {
    if (!id.startsWith("dqa-")) {
      deleteQuickAdd.mutate(id);
    }
  };

  return (
    <Card>
      <Table caption="Your quick adds" highlightOnHover={false}>
        <TableHead>
          <TableRow>
            <TableCell as="th">Name</TableCell>
            <TableCell as="th">Icon</TableCell>
            <TableCell as="th">Cals</TableCell>
            {!preferences?.hideProtein && <TableCell as="th">Pr</TableCell>}
            <TableCell as="th">
              <Delete />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayQuickAdds.map((quickAdd) => (
            <TableRow key={quickAdd.id}>
              <TableCell>{quickAdd.name}</TableCell>
              <TableCell>{findIcon(quickAdd.icon)}</TableCell>
              <TableCell>{quickAdd.calories}</TableCell>
              {!preferences?.hideProtein && (
                <TableCell>{quickAdd.protein}</TableCell>
              )}
              <TableCell onClick={() => handleDelete(quickAdd.id)}>
                {quickAdd.id.startsWith("dqa-") ? null : <Delete />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
