import { errorHandler } from '@/lib/errors';
import { InstrumentFormProps } from '@/lib/props'
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
import { Input } from "@/components/ui/input"

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Combobox } from '@/components/global/combo-box';
import { instrumentsCategories } from '@/constants/data';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const states = [
  { value: "new", label: "New" },
  { value: "dated", label: "Dated" },
  { value: "damaged", label: "Damaged" }
]
const locals = [
  { value: "local-1", label: "Local 1" },
  { value: "local-2", label: "Local 2" },
  { value: "local-3", label: "Local 3" }
]

const NewInstrumentForm = ({ onSuccess }: InstrumentFormProps) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof newInstrumentSchema>>({
    resolver: zodResolver(newInstrumentSchema),
    defaultValues: {
      categoryId: "",
      brandId: "",
      state: "new",
      situation: "available",
      local: "local-1",
      qrCodeId: ""
    },
  })

  async function createQRCode() {
    // QRCode server action
    const res = { success: true, qrCodeId: "qr-009877" }

    return res
  }

  async function onSubmit(data: z.infer<typeof newInstrumentSchema>) {
    try {
      const newQRCode = await createQRCode()
      const res = await { status: 200 }
      if (res.status === 200) {
        toast.success("Visit created successfully");
        router.refresh();
        onSuccess()
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
                <FormLabel className='capitalize'>category</FormLabel>
                <FormControl>
                  <Combobox items={instrumentsCategories} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"brandId"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='capitalize'>brand</FormLabel>
                <FormControl>
                  <Combobox items={instrumentsCategories} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name={"state"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='capitalize'>State</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className='w-full'>Select a state</SelectTrigger>
                    <SelectContent>
                      {states.map((state, idx) => (
                        <SelectItem key={idx} value={state.value}>{state.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"local"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='capitalize'>Local</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className='w-full'>Select a local</SelectTrigger>
                    <SelectContent>
                      {locals.map((local, idx) => (
                        <SelectItem key={idx} value={local.value}>{local.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" size="sm" className='w-full mt-2' onChangeCapture={form.handleSubmit(onSubmit)} disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className='size-4 mr-2' />
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
      local: instrument?.local || "local-1",
      situation: instrument?.situation || "available",
    },
  })

  async function onSubmit(data: z.infer<typeof editInstrumentSchema>) {
    try {
      const res = await { status: 200 }
      if (res.status === 200) {
        toast.success("Visit created successfully");
        router.refresh();
        onSuccess()
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  const { isValid, isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-2'>
        <FormField
          control={form.control}
          name={"userId"}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className='capitalize'>Technician</FormLabel>
              <FormControl>
                <Combobox items={instrumentsCategories} disabled={instrument?.situation === "rented"} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name={"categoryId"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='capitalize'>category</FormLabel>
                <FormControl>
                  <Combobox items={instrumentsCategories} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"brandId"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='capitalize'>Brand</FormLabel>
                <FormControl>
                  <Combobox items={instrumentsCategories} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name={"state"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='capitalize'>State</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className='w-full'>Select a state</SelectTrigger>
                    <SelectContent>
                      {states.map((state, idx) => (
                        <SelectItem key={idx} value={state.value}>{state.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"local"}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='capitalize'>Local</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className='w-full'>Select a local</SelectTrigger>
                    <SelectContent>
                      {locals.map((local, idx) => (
                        <SelectItem key={idx} value={local.value}>{local.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={"situation"}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className='capitalize'>Situation</FormLabel>
              <FormControl>
                <Input {...field} disabled={true} />
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