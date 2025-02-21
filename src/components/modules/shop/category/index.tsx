"use client";

import { NMTable } from "@/components/ui/core/NMTable";
import { ICategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import CreateCategoryModal from "./CreateCategoryModal";

type TCategoriesProps = {
  categories: ICategory[];
};

const ManageCategories = ({ categories }: TCategoriesProps) => {
  console.log("Categories:", categories); // Debugging

  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: () => <div>Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          {row.original.icon ? (
            <Image
              src={row.original.icon}
              alt={row.original.name}
              width={40}
              height={40}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              ?
            </span>
          )}
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => <div>isActive</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Categories</h1>
        <CreateCategoryModal />
      </div>
      {categories.length > 0 ? (
        <NMTable data={categories} columns={columns} />
      ) : (
        <p className="text-center text-gray-500 mt-4">No categories available.</p>
      )}
    </div>
  );
};

export default ManageCategories;
