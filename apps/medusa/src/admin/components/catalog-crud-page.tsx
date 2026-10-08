import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Container, Drawer, Heading, Input, Label, Table, Textarea, toast } from "@medusajs/ui"
import { sdk } from "../lib/sdk"

type FieldDef = {
  name: string
  label: string
  type?: "text" | "textarea" | "date"
  required?: boolean
}

type ColumnDef = {
  key: string
  label: string
}

type CatalogCrudPageProps = {
  title: string
  resourcePath: string
  listKey: string
  columns: ColumnDef[]
  fields: FieldDef[]
}

export function CatalogCrudPage({ title, resourcePath, listKey, columns, fields }: CatalogCrudPageProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Record<string, string>>({})

  const { data, isLoading } = useQuery({
    queryKey: [resourcePath],
    queryFn: () => sdk.client.fetch<Record<string, Record<string, unknown>[]>>(resourcePath),
  })

  const items = data?.[listKey] ?? []

  const createMutation = useMutation({
    mutationFn: (body: Record<string, string>) =>
      sdk.client.fetch<Record<string, unknown>>(resourcePath, { method: "POST", body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [resourcePath] })
      toast.success(`${title} created`)
      setOpen(false)
      setForm({})
    },
    onError: () => {
      toast.error(`Failed to create ${title.toLowerCase()}`)
    },
  })

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">{title}</Heading>
        <Button size="small" onClick={() => setOpen(true)}>
          Create
        </Button>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.HeaderCell key={column.key}>{column.label}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!isLoading && items.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={columns.length}>No {title.toLowerCase()} yet.</Table.Cell>
            </Table.Row>
          )}
          {items.map((item) => (
            <Table.Row key={item.id as string}>
              {columns.map((column) => (
                <Table.Cell key={column.key}>{(item[column.key] as string) ?? "—"}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Drawer open={open} onOpenChange={setOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>New {title}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="flex flex-col gap-y-4">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-y-1">
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.required ? " *" : ""}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    value={form[field.name] ?? ""}
                    onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
                  />
                ) : (
                  <Input
                    id={field.name}
                    type={field.type === "date" ? "date" : "text"}
                    value={form[field.name] ?? ""}
                    onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => createMutation.mutate(form)} isLoading={createMutation.isPending}>
              Save
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </Container>
  )
}

export type { ColumnDef, FieldDef }
