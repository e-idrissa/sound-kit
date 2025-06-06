import { errorHandler } from '@/lib/errors';
import { InstrumentFormProps } from '@/lib/types/props'
import { editInstrumentSchema, newInstrumentSchema } from '@/lib/schemas/instrument.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createQRCode } from '@/lib/actions/qrCode.actions';
import { createInstrument, editInstrument } from '@/lib/actions/intrument.actions';
import { useData } from '@/hooks/use-data';

const states = [
  { value: "new", label: "New" },
  { value: "dated", label: "Dated" },
  { value: "damaged", label: "Damaged" },
  { value: "reparation", label: "Reparation" }
]

const NewInstrumentForm = ({ onSuccess }: InstrumentFormProps) => {
  const { warehouses, categories, brands } = useData()
  const router = useRouter()

  const form = useForm<z.infer<typeof newInstrumentSchema>>({
    resolver: zodResolver(newInstrumentSchema),
    defaultValues: {
      categoryId: "",
      brandId: "",
      state: "new",
      situation: "available",
      warehouseId: "",
      quantity: 1
    },
  })

  async function onSubmit(data: z.infer<typeof newInstrumentSchema>) {
    try {
      const qrCode = await createQRCode()
      let qrCodeId: string | null = null

      if (qrCode.success) {
        qrCodeId = qrCode.qrCode!.id
      } else {
        toast.error("Error creating QR Code");
        return
      }

      const res = await createInstrument({ ...data, qrCodeId })
      if (res.success) {
        toast.success("Instrument created successfully");
        router.refresh();
        onSuccess()
      } else {
        toast.error("Something went wrong. Retry!");
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  const { isValid, isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-2'>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name={"categoryId"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FormItem className="flex flex-col">
                    <FormLabel>Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            type='button'
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? categories?.find(
                                (category) => category.id === field.value
                              )?.name
                              : "Select category"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search category..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                              {categories?.map((category) => (
                                <CommandItem
                                  value={category.name}
                                  key={category.id}
                                  onSelect={() => {
                                    form.setValue("categoryId", category.id)
                                  }}
                                >
                                  {category.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      category.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"brandId"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FormItem className="flex flex-col">
                    <FormLabel>Brand</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            type='button'
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? brands?.find(
                                (brand) => brand.id === field.value
                              )?.name
                              : "Select brand"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search brand..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No brand found.</CommandEmpty>
                            <CommandGroup>
                              {brands?.map((brand) => (
                                <CommandItem
                                  value={brand.name}
                                  key={brand.id}
                                  onSelect={() => {
                                    form.setValue("brandId", brand.id)
                                  }}
                                >
                                  {brand.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      brand.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name={"warehouseId"}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Warehouse</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Select a warehouse" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {warehouses?.map((warehouse, idx) => (
                      <SelectItem key={idx} value={warehouse.id}>{warehouse.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"state"}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>State</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states?.map((state, idx) => (
                      <SelectItem key={idx} value={state.value}>{state.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={"quantity"}
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="Quantity" type='number' {...field} min={1} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className='w-full mt-2' onChangeCapture={form.handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className='size-4 mr-2 animate-spin' />
              <i>Submitting...</i>
            </span>
          ) : (
            <span className="flex items-center">
              <span>Create</span>
            </span>
          )}
        </Button>
      </form>
    </Form>
  )
}

const EditInstrumentForm = ({ onSuccess, instrument }: InstrumentFormProps) => {
  const { warehouses, categories, brands, users } = useData()
  const router = useRouter()

  const form = useForm<z.infer<typeof editInstrumentSchema>>({
    resolver: zodResolver(editInstrumentSchema),
    defaultValues: {
      id: instrument?.id || "",
      qrCodeId: instrument?.qrCodeId || "",
      userId: instrument?.userId || "",
      categoryId: instrument?.categoryId || "",
      brandId: instrument?.brandId || "",
      state: instrument?.state || "new",
      warehouseId: instrument?.warehouseId || "",
      situation: instrument?.situation || "available",
    },
  })

  async function onSubmit(data: z.infer<typeof editInstrumentSchema>) {
    try {
      const res = await editInstrument(data)
      if (res.success) {
        toast.success("Instrument edited successfully");
        router.refresh();
        onSuccess()
      } else {
        toast.error("Something went wrong. Retry!");
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  const { isValid, isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-2'>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name={"categoryId"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FormItem className="flex flex-col">
                    <FormLabel>Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            type='button'
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? categories?.find(
                                (category) => category.id === field.value
                              )?.name
                              : "Select category"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search category..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                              {categories?.map((category) => (
                                <CommandItem
                                  value={category.name}
                                  key={category.id}
                                  onSelect={() => {
                                    form.setValue("categoryId", category.id)
                                  }}
                                >
                                  {category.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      category.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"brandId"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FormItem className="flex flex-col">
                    <FormLabel>Brand</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            type='button'
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? brands?.find(
                                (brand) => brand.id === field.value
                              )?.name
                              : "Select brand"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search brand..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No brand found.</CommandEmpty>
                            <CommandGroup>
                              {brands?.map((brand) => (
                                <CommandItem
                                  value={brand.name}
                                  key={brand.id}
                                  onSelect={() => {
                                    form.setValue("brandId", brand.id)
                                  }}
                                >
                                  {brand.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      brand.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name={"warehouseId"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Warehouse</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a warehouse" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {warehouses?.map((warehouse, idx) => (
                      <SelectItem key={idx} value={warehouse.id}>{warehouse.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"state"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states?.map((state, idx) => (
                      <SelectItem key={idx} value={state.value}>{state.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={"userId"}
          render={({ field }) => (
            <FormItem className="w-full mt-6">
              <FormControl>
                <FormItem className="w-full flex flex-row items-center gap-4">
                  <FormLabel className="w-[14%]">Technician</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          type='button'
                          className={cn(
                            "w-[82%] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? users?.find(
                              (user) => user.id === field.value
                            )?.name
                            : "Select technician"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search technician..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No technician found.</CommandEmpty>
                          <CommandGroup>
                            {users?.map((user) => (
                              <CommandItem
                                value={user.id}
                                key={user.id}
                                onSelect={() => {
                                  form.setValue("userId", user.id)
                                }}
                              >
                                {user.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    user.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className='w-full mt-2' onChangeCapture={form.handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className='size-4 mr-2' />
              <i>Submitting...</i>
            </span>
          ) : (
            <span className="flex items-center">
              <span>Save changes</span>
            </span>
          )}
        </Button>
      </form>
    </Form>
  )
}

export const InstrumentForm = ({ onSuccess, instrument, type = "create" }: InstrumentFormProps) => {
  return (
    <div className="w-full">
      {type === "create" && <NewInstrumentForm onSuccess={onSuccess} />}
      {type === "edit" && <EditInstrumentForm onSuccess={onSuccess} instrument={instrument} />}
    </div>
  )
}