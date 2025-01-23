import { columns } from "@/app/admin/pages/notes/components/NoteDataTable/columns";
import { NoteDataTable } from "@/app/admin/pages/notes/components/NoteDataTable/data-table";
import { Button } from "@/shared/components/shadcn/button";
import { Card, CardContent } from "@/shared/components/shadcn/card";
import { Plus } from "lucide-react";
import { Payment } from "./components/NoteDataTable/columns";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];

const NotePage = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">Notas</h2>
          <Button>
            <Plus /> Agregar
          </Button>
        </div>
        <div className="py-6">
          <NoteDataTable columns={columns} data={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotePage;
