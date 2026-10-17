import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Checkbox, Container, Drawer, Heading, Input, Label, Table, Textarea, toast, usePrompt } from "@medusajs/ui"
import { sdk } from "../lib/sdk"

type FieldDef = {
  name: string
  label: string
  type?: "text" | "textarea" | "date" | "checkbox"
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

type DrawerState = { mode: "create" | "edit"; id?: string; form: Record<string, string | boolean> }

export function CatalogCrudPage({ title, resourcePath, listKey, columns, fields }: CatalogCrudPageProps) {
  const queryClient = useQueryClient()
  const prompt = usePrompt()
  const [drawer, setDrawer] = useState<DrawerState | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: [resourcePath],
    queryFn: () => sdk.client.fetch<Record<string, Record<string, unknown>[]>>(resourcePath),
  })

  const items = data?.[listKey] ?? []

  const invalidate = () => queryClient.invalidateQueries({ queryKey: [resourcePath] })

  const createMutation = useMutation({
    mutationFn: (body: Record<string, string | boolean>) =>
      sdk.client.fetch<Record<string, unknown>>(resourcePath, { method: "POST", body }),
    onSuccess: () => {
      invalidate()
      toast.success(`${title} created`)
      setDrawer(null)
    },
    onError: () => toast.error(`Failed to create ${title.toLowerCase()}`),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, ...body }: Record<string, string | boolean> & { id: string }) =>
      sdk.client.fetch<Record<string, unknown>>(`${resourcePath}/${id}`, { method: "POST", body }),
    onSuccess: () => {
      invalidate()
      toast.success(`${title} updated`)
      setDrawer(null)
    },
    onError: () => toast.error(`Failed to update ${title.toLowerCase()}`),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => sdk.client.fetch(`${resourcePath}/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      invalidate()
      toast.success(`${title} deleted`)
    },
    onError: () => toast.error(`Failed to delete ${title.toLowerCase()}`),
  })

  const openCreate = () => setDrawer({ mode: "create", form: {} })

  const openEdit = (item: Record<string, unknown>) => {
    const form: Record<string, string | boolean> = {}
    for (const field of fields) {
      form[field.name] = field.type === "checkbox" ? Boolean(item[field.name]) : ((item[field.name] as string) ?? "")
    }
    setDrawer({ mode: "edit", id: item.id as string, form })
  }

  const handleDelete = async (id: string, label: string) => {
    const confirmed = await prompt({
      title: `Delete ${title.toLowerCase()}`,
      description: `Are you sure you want to delete "${label}"? This cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
    })
    if (confirmed) {
      deleteMutation.mutate(id)
    }
  }

  const handleSave = () => {
    if (!drawer) return
    if (drawer.mode === "create") {
      createMutation.mutate(drawer.form)
    } else if (drawer.id) {
      updateMutation.mutate({ id: drawer.id, ...drawer.form })
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">{title}</Heading>
        <Button size="small" onClick={openCreate}>
          Create
        </Button>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.HeaderCell key={column.key}>{column.label}</Table.HeaderCell>
            ))}
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!isLoading && items.length === 0 && (
            <Table.Row>
              <Table.Cell {...{ colSpan: columns.length + 1 }}>No {title.toLowerCase()} yet.</Table.Cell>
            </Table.Row>
          )}
          {items.map((item) => (
            <Table.Row key={item.id as string} className="cursor-pointer" onClick={() => openEdit(item)}>
              {columns.map((column) => (
                <Table.Cell key={column.key}>
                  {typeof item[column.key] === "boolean" ? (item[column.key] ? "Yes" : "No") : (item[column.key] as string) ?? "—"}
                </Table.Cell>
              ))}
              <Table.Cell>
                <Button
                  size="small"
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(item.id as string, (item[columns[0].key] as string) ?? title)
                  }}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Drawer open={drawer !== null} onOpenChange={(isOpen) => !isOpen && setDrawer(null)}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{drawer?.mode === "edit" ? `Edit ${title}` : `New ${title}`}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="flex flex-col gap-y-4">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-y-1">
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.required ? " *" : ""}
                </Label>
                {field.type === "checkbox" ? (
                  <Checkbox
                    id={field.name}
                    checked={Boolean(drawer?.form[field.name])}
                    onCheckedChange={(checked) =>
                      setDrawer((prev) => (prev ? { ...prev, form: { ...prev.form, [field.name]: checked === true } } : prev))
                    }
                  />
                ) : field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    value={(drawer?.form[field.name] as string) ?? ""}
                    onChange={(e) =>
                      setDrawer((prev) => (prev ? { ...prev, form: { ...prev.form, [field.name]: e.target.value } } : prev))
                    }
                  />
                ) : (
                  <Input
                    id={field.name}
                    type={field.type === "date" ? "date" : "text"}
                    value={(drawer?.form[field.name] as string) ?? ""}
                    onChange={(e) =>
                      setDrawer((prev) => (prev ? { ...prev, form: { ...prev.form, [field.name]: e.target.value } } : prev))
                    }
                  />
                )}
              </div>
            ))}
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setDrawer(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave} isLoading={isSaving}>
              Save
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </Container>
  )
}

export type { ColumnDef, FieldDef }
